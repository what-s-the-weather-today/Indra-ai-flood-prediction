import React from 'react';
import RiskDonutCard from '../components/RiskDonutCard';
import FloodRiskMapCard from '../components/FloodRiskMapCard';
import WhyThisRiskCard from '../components/WhyThisRiskCard';
import { CITIES_DATA } from '../data/mock';

export default function FloodRiskPage({ selectedCity }) {
  const cityData = CITIES_DATA[selectedCity] || CITIES_DATA.Jaipur;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#19C3F0]/25 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Flood Risk Mapping & Basin Analysis — {cityData.name}
        </h1>
        <p className="text-[15px] text-slate-300 mt-1">
          Interactive location-based flood risk corridors, river channel overlays, and contributing risk factors.
        </p>
      </div>

      {/* Large Map + Risk Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <FloodRiskMapCard
            cityData={cityData}
            heightClass="h-[560px]"
          />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <RiskDonutCard
            cityData={cityData}
            enlarged={true}
          />
          <WhyThisRiskCard cityData={cityData} />
        </div>
      </div>
    </div>
  );
}
