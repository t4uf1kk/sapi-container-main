import React from 'react';
import { Activity, Wifi, WifiOff, RefreshCw, Video } from 'lucide-react';
import { Link } from 'react-router-dom'; // import Link

const Header = ({ isConnected, isLoading, fetchData }) => (
  <div className="bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <Activity className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Monitor Sapi</h1>
            <p className="text-sm text-gray-500">ESP32-C3 + ADXL345</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Status koneksi */}
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-600" />
            )}
            <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Terhubung' : 'Terputus'}
            </span>
          </div>

          {/* Tombol Refresh */}
          <button 
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Tombol CCTV */}
          <Link
            to="/cctv"
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">CCTV</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
