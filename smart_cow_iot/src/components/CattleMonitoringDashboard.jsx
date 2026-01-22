// CattleMonitoringDashboard.jsx

import React, { useState, useEffect } from "react";
import {
  Zap,
  TrendingUp,
  AlertCircle,
  Activity,
  Monitor,
  Smartphone,
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import StatusCard from "./StatusCard";
import ActivityHistory from "./ActivityHistory";
import CattleStatusChart from "./CattleStatusChart";
import { fetchSensorData } from "../services/sensorService";
import { getActivityColor } from "../utils/colorUtils";

const CattleMonitoringDashboard = () => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [refreshRate, setRefreshRate] = useState(2000);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchSensorData();

      // Jika backend return array, ambil elemen terakhir (data terbaru)
      const newData = Array.isArray(response)
        ? response[response.length - 1]
        : response;

      // Normalisasi data agar selalu aman
      const safeData = {
        xg: newData?.xg ?? 0,
        yg: newData?.yg ?? 0,
        zg: newData?.zg ?? 0,
        avgMag: newData?.avgMag ?? 1.0,
        varMag: newData?.varMag ?? 0,
        pitch: newData?.pitch ?? 0,
        roll: newData?.roll ?? 0,
        hpRMS: newData?.hpRMS ?? 0,
        peakCount: newData?.peakCount ?? 0,
        activity: newData?.activity ?? "Tidak ada data",
        timestamp: newData?.timestamp
          ? new Date(newData.timestamp)
          : new Date(),
      };

      setData(safeData);
      setIsConnected(true);
      setHistory((prev) => [safeData, ...prev].slice(0, 50));
    } catch (error) {
      console.error("Error fetchData:", error);
      setIsConnected(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshRate);
    return () => clearInterval(interval);
  }, [refreshRate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header
        isConnected={isConnected}
        isLoading={isLoading}
        fetchData={fetchData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!data ? (
          <div className="text-center text-gray-600">Menunggu data...</div>
        ) : (
          <>
            {/* Sensor Data Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
              <StatusCard
                title="Accelerometer X"
                value={data.xg.toFixed(3)}
                unit="g"
                icon={TrendingUp}
                color="text-red-600"
              />
              <StatusCard
                title="Accelerometer Y"
                value={data.yg.toFixed(3)}
                unit="g"
                icon={TrendingUp}
                color="text-green-600"
              />
              <StatusCard
                title="Accelerometer Z"
                value={data.zg.toFixed(3)}
                unit="g"
                icon={TrendingUp}
                color="text-blue-600"
              />
              <StatusCard
                title="Rata-rata Magnitudo"
                value={data.avgMag.toFixed(3)}
                unit="g"
                icon={Zap}
                color="text-purple-600"
              />
              <StatusCard
                title="Varians"
                value={data.varMag.toFixed(4)}
                unit=""
                icon={AlertCircle}
                color="text-orange-600"
              />
              <StatusCard
                title="HP RMS"
                value={data.hpRMS.toFixed(4)}
                unit=""
                icon={Activity}
                color="text-cyan-600"
              />
            </div>

            {/* Orientation Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <StatusCard
                title="Pitch"
                value={data.pitch.toFixed(1)}
                unit="°"
                icon={Monitor}
                color="text-indigo-600"
              />
              <StatusCard
                title="Roll"
                value={data.roll.toFixed(1)}
                unit="°"
                icon={Smartphone}
                color="text-pink-600"
              />
              <StatusCard
                title="Peak Count"
                value={data.peakCount}
                unit=""
                icon={TrendingUp}
                color="text-teal-600"
              />
            </div>

            {/* Activity Status */}
            <div
              className={`rounded-xl p-6 border-2 ${getActivityColor(
                data.activity
              )} border-opacity-20 mb-6`}
            >
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Status Aktivitas
                </h2>
                <div className="text-4xl font-bold mb-2">{data.activity}</div>
                <p className="text-sm text-gray-600">
                  Terakhir update: {data.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Activity History */}
            <ActivityHistory history={history} />
            <CattleStatusChart dataHistory={history} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CattleMonitoringDashboard;
