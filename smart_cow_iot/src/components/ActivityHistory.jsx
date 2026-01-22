import React from 'react';
import { getActivityColor } from '../utils/colorUtils';

const ActivityHistory = ({ history }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="px-6 py-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">Riwayat Aktivitas</h3>
    </div>
    <div className="max-h-96 overflow-y-auto">
      {history.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {history.map((entry, index) => (
            <div key={index} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getActivityColor(entry.activity).split(' ')[1]}`}></div>
                <span className="font-medium text-gray-900">{entry.activity}</span>
              </div>
              <div className="text-sm text-gray-500">
                {entry.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 py-8 text-center text-gray-500">
          Belum ada data riwayat
        </div>
      )}
    </div>
  </div>
);

export default ActivityHistory;
