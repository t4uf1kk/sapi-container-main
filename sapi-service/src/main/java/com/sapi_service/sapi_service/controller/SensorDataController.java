package com.sapi_service.sapi_service.controller;

import com.sapi_service.sapi_service.entity.SensorData;
import com.sapi_service.sapi_service.service.SensorDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/sapi")
public class SensorDataController {

    private final SensorDataService service;

    public SensorDataController(SensorDataService service) {
        this.service = service;
    }

    // Single data - UDAH BENER
    @PostMapping
    public ResponseEntity<SensorData> receiveData(@RequestBody SensorData data) {
        SensorData saved = service.saveData(data);
        return ResponseEntity.ok(saved);
    }

    // Batch data - UDAH BENER  
    @PostMapping("/batch")
    public ResponseEntity<List<SensorData>> receiveBatchData(@RequestBody List<SensorData> dataList) {
        List<SensorData> savedList = service.saveAllData(dataList);
        return ResponseEntity.ok(savedList);
    }

    // Latest data - UDAH BENER
    @GetMapping("/latest")
    public ResponseEntity<SensorData> getLatestData() {
        return ResponseEntity.ok(service.getLatestData());
    }

    // All data - UDAH BENER
    @GetMapping
    public List<SensorData> getAllData() {
        return service.getAllData();
    }

    // UBAH INI - Ambil data dari FILE HARIAN berdasarkan ID
    @GetMapping("/{id}/file")
    public ResponseEntity<SensorData> getDataFromFile(@PathVariable Long id) {
        SensorData data = service.getDataFromDailyFile(id);
        return ResponseEntity.ok(data);
    }

    // UBAH INI - Cek file harian exists
    @GetMapping("/{id}/file-exists")
    public ResponseEntity<Boolean> checkFileExists(@PathVariable Long id) {
        boolean exists = service.isFileExists(id);
        return ResponseEntity.ok(exists);
    }

    // TAMBAH INI - Ambil SEMUA data hari ini dari file harian
    @GetMapping("/file/today")
    public ResponseEntity<List<SensorData>> getTodayDataFromFile() {
        List<SensorData> todayData = service.getTodayDataFromFile();
        return ResponseEntity.ok(todayData);
    }

    // TAMBAH INI - Ambil data dari file harian berdasarkan tanggal
    @GetMapping("/file/{date}")
    public ResponseEntity<List<SensorData>> getDataFromFileByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        List<SensorData> data = service.getAllDataFromDailyFile(localDate);
        return ResponseEntity.ok(data);
    }

    // TAMBAH INI - Cek file harian untuk tanggal tertentu
    @GetMapping("/file/{date}/exists")
    public ResponseEntity<Boolean> checkDailyFileExists(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        boolean exists = service.isDailyFileExists(localDate);
        return ResponseEntity.ok(exists);
    }
}