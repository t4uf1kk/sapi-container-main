// src/components/CattleCCTV.jsx
import React, { useEffect, useRef, useState } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import Header from "./Header";

const CattleCCTV = ({ wsUrl = "ws://localhost:9999", cctvIp = "192.168.1.24", isConnected = true, isLoading = false, fetchData = () => {} }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);

    try {
      const jsmpegPlayer = new JSMpeg.Player(wsUrl, {
        canvas: canvasRef.current,
        autoplay: true,
        audio: false,
      });

      setPlayer(jsmpegPlayer);
      setLoading(false);
    } catch (err) {
      console.error("WebSocket / JSMpeg error", err);
      setError(true);
      setLoading(false);
    }

    return () => {
      if (player) player.destroy();
    };
  }, [wsUrl]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header isConnected={isConnected} isLoading={isLoading} fetchData={fetchData} />

      <main className="flex flex-col items-center justify-start py-6 px-4 flex-1">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Streaming CCTV Kandang</h1>
        <p className="text-sm text-gray-500 mb-4">IP CCTV: {cctvIp}</p>

        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 text-white z-10">
              Memuat streaming...
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-600 z-10">
              Gagal memuat streaming. Periksa koneksi CCTV atau server WebSocket.
            </div>
          )}

          <canvas ref={canvasRef} className="w-full h-[500px] bg-black"></canvas>
        </div>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Streaming menggunakan WebSocket / JSMpeg, tidak memerlukan file TS.
        </p>
      </main>
    </div>
  );
};

export default CattleCCTV;
