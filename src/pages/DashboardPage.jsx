import React from 'react';
import HeroSection from '../components/HeroSection';
import RiskDonutCard from '../components/RiskDonutCard';
import FloodRiskMapCard from '../components/FloodRiskMapCard';
import RainfallForecastStrip from '../components/RainfallForecastStrip';
import LatestAlertsCard from '../components/LatestAlertsCard';
import WhyThisRiskCard from '../components/WhyThisRiskCard';
import { CITIES_DATA } from '../data/mock';

export default function DashboardPage({ selectedCity }) {
  const cityData = CITIES_DATA[selectedCity] || CITIES_DATA.Jaipur;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#19C3F0]/25 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {cityData.name} Command Dashboard
          </h1>
          <p className="text-[15px] text-slate-300 mt-1">
            Expanded real-time rainfall overview, risk distribution, and active alerts for {cityData.name}, {cityData.state}.
          </p>
        </div>
      </div>

      {/* Three Summary Cards */}
      <HeroSection cityData={cityData} showHeroText={false} />

      {/* Enlarged Map + Donut + WhyThisRisk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <FloodRiskMapCard
            cityData={cityData}
            heightClass="h-[520px]"
          />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-6">
          <RiskDonutCard
            cityData={cityData}
            enlarged={true}
          />
          <WhyThisRiskCard cityData={cityData} />
        </div>
      </div>

      {/* Forecast & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <RainfallForecastStrip cityData={cityData} />
        </div>
        <div className="lg:col-span-6">
          <LatestAlertsCard cityData={cityData} showViewAll={false} />
        </div>
      </div>
    </div>
  );
}
