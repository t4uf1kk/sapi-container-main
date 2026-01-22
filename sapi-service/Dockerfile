# ===============================
# STAGE 1 — Build Spring Boot app
# ===============================
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml dulu (untuk cache dependencies)
COPY pom.xml .

# Copy source code
COPY src ./src

# Build aplikasi (skip test biar cepat)
RUN mvn clean package -DskipTests

# ===============================
# STAGE 2 — Run application  
# ===============================
FROM eclipse-temurin:21-jre 
WORKDIR /app

# Copy hasil build ke container final
COPY --from=build /app/target/*.jar app.jar

# Buat folder penyimpanan data sensor
RUN mkdir -p /app/data/sensor_data


EXPOSE 8081

# Jalankan aplikasi
ENTRYPOINT ["java", "-jar", "app.jar"]