// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CattleMonitoringDashboard from "./components/CattleMonitoringDashboard";
import CCTVPage from "./components/CCTVPage";

const App = () => {
  return (
    <Router>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<CattleMonitoringDashboard />} />
          <Route path="/cctv" element={<CCTVPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
