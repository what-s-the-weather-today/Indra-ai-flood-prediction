import React from 'react';
import LatestAlertsCard from '../components/LatestAlertsCard';
import WhyThisRiskCard from '../components/WhyThisRiskCard';
import SafetyBanner from '../components/SafetyBanner';
import { CITIES_DATA } from '../data/mock';

export default function AlertsPage({ selectedCity }) {
  const cityData = CITIES_DATA[selectedCity] || CITIES_DATA.Jaipur;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#19C3F0]/25 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Early Warning Alerts & Safety Advisories — {cityData.name}
        </h1>
        <p className="text-[15px] text-slate-300 mt-1">
          Real-time location-based flood advisories synchronized with the {cityData.name} hourly rainfall forecast.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <LatestAlertsCard cityData={cityData} showViewAll={false} />
        </div>
        <div className="lg:col-span-5">
          <WhyThisRiskCard cityData={cityData} />
        </div>
      </div>

      <SafetyBanner />
    </div>
  );
}
