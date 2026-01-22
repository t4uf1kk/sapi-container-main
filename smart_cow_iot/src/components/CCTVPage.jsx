// src/components/CCTVPage.jsx
import React from "react";
import CattleCCTV from "./CattleCCTV";

const CCTVPage = () => {
  return <CattleCCTV wsUrl="ws://localhost:9999" cctvIp="192.168.1.24" />;
};

export default CCTVPage;
