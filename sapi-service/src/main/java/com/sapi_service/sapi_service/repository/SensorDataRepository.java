package com.sapi_service.sapi_service.repository;

import com.sapi_service.sapi_service.entity.SensorData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface SensorDataRepository extends JpaRepository<SensorData, Long> {
    
    // Method yang udah ada
    SensorData findTopByOrderByTimestampDesc();
    
    // METHOD BARU UNTUK UTC QUERIES
    List<SensorData> findByTimestampBetween(Instant start, Instant end);
    
    // Optional: Query buat date range yang lebih flexibel
    @Query("SELECT s FROM SensorData s WHERE s.timestamp >= :start AND s.timestamp < :end ORDER BY s.timestamp ASC")
    List<SensorData> findByTimestampRange(@Param("start") Instant start, @Param("end") Instant end);
    
    // Optional: Buat yang pake storageDate juga
    List<SensorData> findByStorageDateBetween(Instant start, Instant end);
}