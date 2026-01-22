import React from 'react';

const StatusCard = ({ title, value, unit, icon: Icon, color = 'text-gray-600' }) => (
  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <Icon className={`w-4 h-4 ${color}`} />
    </div>
    <div className="flex items-baseline space-x-1">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      {unit && <span className="text-sm text-gray-500">{unit}</span>}
    </div>
  </div>
);

export default StatusCard;
