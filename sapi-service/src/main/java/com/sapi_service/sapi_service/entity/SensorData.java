package com.sapi_service.sapi_service.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "sensor_data")
public class SensorData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // === SENSOR DATA FIELDS === 
    private double xg;
    private double yg;
    private double zg;
    private double avgMag;
    private double varMag;
    private double pitch;
    private double roll;
    private double hpRMS;
    private int peakCount;
    private String activity;

    // UTC BANGET - Pure UTC
    private Instant timestamp = Instant.now();

    // === HYBRID STORAGE FIELDS ===
    @Column(length = 512)
    private String filePath;

    // Ini juga bisa pake Instant kalo mau konsisten
    private Instant storageDate;

    // === CONSTRUCTORS ===
    public SensorData() {}

    public SensorData(double xg, double yg, double zg, double avgMag, double varMag,
                      double pitch, double roll, double hpRMS, int peakCount,
                      String activity) {
        this.xg = xg;
        this.yg = yg;
        this.zg = zg;
        this.avgMag = avgMag;
        this.varMag = varMag;
        this.pitch = pitch;
        this.roll = roll;
        this.hpRMS = hpRMS;
        this.peakCount = peakCount;
        this.activity = activity;
        this.timestamp = Instant.now(); // Auto UTC
    }

    // === GETTER & SETTER ===
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getXg() { return xg; }
    public void setXg(double xg) { this.xg = xg; }

    public double getYg() { return yg; }
    public void setYg(double yg) { this.yg = yg; }

    public double getZg() { return zg; }
    public void setZg(double zg) { this.zg = zg; }

    public double getAvgMag() { return avgMag; }
    public void setAvgMag(double avgMag) { this.avgMag = avgMag; }

    public double getVarMag() { return varMag; }
    public void setVarMag(double varMag) { this.varMag = varMag; }

    public double getPitch() { return pitch; }
    public void setPitch(double pitch) { this.pitch = pitch; }

    public double getRoll() { return roll; }
    public void setRoll(double roll) { this.roll = roll; }

    public double getHpRMS() { return hpRMS; }
    public void setHpRMS(double hpRMS) { this.hpRMS = hpRMS; }

    public int getPeakCount() { return peakCount; }
    public void setPeakCount(int peakCount) { this.peakCount = peakCount; }

    public String getActivity() { return activity; }
    public void setActivity(String activity) { this.activity = activity; }

    // Getter/Setter UTC
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public Instant getStorageDate() { return storageDate; }
    public void setStorageDate(Instant storageDate) { this.storageDate = storageDate; }
}