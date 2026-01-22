import React from 'react';

// Icon sapi sebagai SVG inline
const CowIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 11c0-1.1.9-2 2-2h1v-1c0-1.1.9-2 2-2h1v-1c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v1h1c1.1 0 2 .9 2 2v1h1c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2h-1v1c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-1H5c-1.1 0-2-.9-2-2v-5zm5-2h8v1H8v-1zm0 4h8v2H8v-2z"/>
  </svg>
);

const CattleStatus = ({ dataHistory }) => {
  const latestStatus = dataHistory.length > 0 ? dataHistory[0].activity : 'Menunggu Data...';


};

export default CattleStatus;
