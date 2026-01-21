package com.sapi_service.sapi_service.service;

import com.sapi_service.sapi_service.entity.SensorData;
import com.sapi_service.sapi_service.repository.SensorDataRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class SensorDataService {

    private final SensorDataRepository repository;
    private final ObjectMapper objectMapper;

    @Value("${file.storage.path:/app/data/sensor_data}")
    private String fileStoragePath;

    private final DateTimeFormatter fileDateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public SensorDataService(SensorDataRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    /**
     * Simpan data sensor ke database dan append ke file harian
     */
    public SensorData saveData(SensorData data) {
        try {
            // 1. Set timestamp UTC jika null
            if (data.getTimestamp() == null) {
                data.setTimestamp(Instant.now());
            }

            // 2. Simpan ke database dulu -> dapat ID
            SensorData saved = repository.save(data);

            // 3. Tentukan file harian
            LocalDate today = LocalDate.now(ZoneOffset.UTC);
            String filename = today.format(fileDateFormatter) + ".json";
            String filePath = fileStoragePath + File.separator + filename;

            // 4. Buat folder jika belum ada
            File storageDir = new File(fileStoragePath);
            if (!storageDir.exists()) {
                storageDir.mkdirs();
            }

            // 5. Ambil data lama dari file
            List<SensorData> dailyData = new ArrayList<>();
            File dailyFile = new File(filePath);
            if (dailyFile.exists()) {
                try {
                    dailyData = Arrays.asList(objectMapper.readValue(dailyFile, SensorData[].class));
                    dailyData = new ArrayList<>(dailyData);
                } catch (Exception e) {
                    dailyFile.delete();
                    dailyData = new ArrayList<>();
                }
            }

            // 6. Set filePath & storageDate pada object yang sudah punya ID
            saved.setFilePath(filePath);
            saved.setStorageDate(Instant.now());

            // 7. Append ke list & tulis ke file
            dailyData.add(saved);
            objectMapper.writeValue(dailyFile, dailyData);

            // 8. Update kembali database dengan filePath & storageDate
            return repository.save(saved);

        } catch (IOException e) {
            throw new RuntimeException("Gagal menyimpan data sensor ke file harian", e);
        }
    }

    /**
     * Simpan banyak data sekaligus
     */
    public List<SensorData> saveAllData(List<SensorData> dataList) {
        List<SensorData> savedData = new ArrayList<>();
        for (SensorData data : dataList) {
            savedData.add(saveData(data));
        }
        return savedData;
    }

    /**
     * Ambil semua data dari database
     */
    public List<SensorData> getAllData() {
        return repository.findAll();
    }

    /**
     * Ambil data terbaru dari database
     */
    public SensorData getLatestData() {
        return repository.findTopByOrderByTimestampDesc();
    }

    /**
     * Ambil data dari file harian berdasarkan ID
     */
    public SensorData getDataFromDailyFile(Long id) {
        SensorData sensorData = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Data tidak ditemukan dengan ID: " + id));

        if (sensorData.getFilePath() != null) {
            try {
                File dailyFile = new File(sensorData.getFilePath());
                if (!dailyFile.exists()) {
                    return sensorData;
                }

                List<SensorData> dailyData = Arrays.asList(objectMapper.readValue(
                        dailyFile,
                        SensorData[].class
                ));

                return dailyData.stream()
                        .filter(d -> d.getId() != null && d.getId().equals(id))
                        .findFirst()
                        .orElse(sensorData);

            } catch (IOException e) {
                throw new RuntimeException("Gagal membaca data dari file harian", e);
            }
        }

        return sensorData;
    }

    /**
     * Ambil semua data dari file harian untuk tanggal tertentu
     */
    public List<SensorData> getAllDataFromDailyFile(LocalDate date) {
        try {
            String filename = date.format(fileDateFormatter) + ".json";
            String filePath = fileStoragePath + File.separator + filename;
            File dailyFile = new File(filePath);

            if (!dailyFile.exists()) {
                return Collections.emptyList();
            }

            return Arrays.asList(objectMapper.readValue(dailyFile, SensorData[].class));
        } catch (IOException e) {
            throw new RuntimeException("Gagal membaca data dari file harian: " + date, e);
        }
    }

    /**
     * Ambil data hari ini dari file (UTC)
     */
    public List<SensorData> getTodayDataFromFile() {
        return getAllDataFromDailyFile(LocalDate.now(ZoneOffset.UTC));
    }

    /**
     * Cek file harian untuk ID tertentu
     */
    public boolean isFileExists(Long id) {
        SensorData data = repository.findById(id).orElse(null);
        return data != null && data.getFilePath() != null && new File(data.getFilePath()).exists();
    }

    /**
     * Cek file harian untuk tanggal tertentu
     */
    public boolean isDailyFileExists(LocalDate date) {
        String filename = date.format(fileDateFormatter) + ".json";
        return new File(fileStoragePath + File.separator + filename).exists();
    }

    /**
     * Ambil data berdasarkan rentang waktu UTC
     */
    public List<SensorData> getDataByDateRange(Instant start, Instant end) {
        return repository.findByTimestampBetween(start, end);
    }

    /**
     * Ambil data hari ini dari database (UTC)
     */
    public List<SensorData> getTodayDataFromDatabase() {
        Instant startOfDay = LocalDate.now(ZoneOffset.UTC).atStartOfDay().toInstant(ZoneOffset.UTC);
        Instant endOfDay = startOfDay.plusSeconds(86400);
        return getDataByDateRange(startOfDay, endOfDay);
    }

    /**
     * Ambil daftar file harian yang tersedia
     */
    public List<String> getAvailableDailyFiles() {
        File storageDir = new File(fileStoragePath);
        if (!storageDir.exists()) return Collections.emptyList();

        String[] files = storageDir.list((dir, name) -> name.endsWith(".json"));
        if (files == null) return Collections.emptyList();

        return Arrays.asList(files);
    }
}
