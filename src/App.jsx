import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatAssistant from './components/ChatAssistant';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LiveRainfallPage from './pages/LiveRainfallPage';
import FloodRiskPage from './pages/FloodRiskPage';
import AlertsPage from './pages/AlertsPage';
import AboutUsPage from './pages/AboutUsPage';
import { APP_INFO, CITY_LIST } from './data/mock';

export default function App() {
  const [selectedCity, setSelectedCity] = useState(CITY_LIST[0]); // Jaipur by default

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1A33] text-white relative">
      {/* Top Navigation Bar */}
      <Navbar selectedCity={selectedCity} onSelectCity={setSelectedCity} />

      {/* Main Content Container — ample bottom padding so floating chat button never covers content */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-28">
        <Routes>
          <Route
            path="/"
            element={<HomePage selectedCity={selectedCity} onSelectCity={setSelectedCity} />}
          />
          <Route
            path="/dashboard"
            element={<DashboardPage selectedCity={selectedCity} onSelectCity={setSelectedCity} />}
          />
          <Route
            path="/live-rainfall"
            element={<LiveRainfallPage selectedCity={selectedCity} onSelectCity={setSelectedCity} />}
          />
          <Route
            path="/flood-risk"
            element={<FloodRiskPage selectedCity={selectedCity} onSelectCity={setSelectedCity} />}
          />
          <Route
            path="/alerts"
            element={<AlertsPage selectedCity={selectedCity} />}
          />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </main>

      {/* Footer with bottom and right clearance so the floating chat button never covers text */}
      <footer className="border-t border-[#19C3F0]/20 bg-[#071122]/90 pt-5 pb-24 sm:pb-10 px-4 sm:px-6 lg:px-8 sm:pr-28">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[14px] text-slate-300 leading-relaxed">
          <p className="break-words">
            <span className="font-bold text-white">{APP_INFO.name}</span> — {APP_INFO.tagline}
          </p>
          <p className="break-words">
            Team Indra · Saksham Agarwal (Leader), Lakshya Raj Yadav, Nishant Sharma
          </p>
        </div>
      </footer>

      {/* 9. Floating Chat Assistant (bottom right, 24px margin, closed by default) */}
      <ChatAssistant selectedCity={selectedCity} />
    </div>
  );
}
