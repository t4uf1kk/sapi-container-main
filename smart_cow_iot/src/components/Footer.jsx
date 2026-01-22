import React from 'react';

const Footer = () => (
  <div className="bg-white border-t border-gray-200 mt-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="text-sm text-gray-600">
          Sistem Monitoring Sapi dengan ESP32-C3 + ADXL345
        </div>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          Dibuat dengan React.js
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
