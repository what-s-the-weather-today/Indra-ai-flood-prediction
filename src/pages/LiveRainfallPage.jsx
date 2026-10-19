import React from 'react';
import { CloudRain, Info } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import RainfallForecastStrip from '../components/RainfallForecastStrip';
import { CITIES_DATA, RAIN_THRESHOLDS, getRainCategory } from '../data/mock';

export default function LiveRainfallPage({ selectedCity }) {
  const cityData = CITIES_DATA[selectedCity] || CITIES_DATA.Jaipur;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#19C3F0]/25 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Live Rainfall & Forecast — {cityData.name}
        </h1>
        <p className="text-[15px] text-slate-300 mt-1">
          Real-time hourly rainfall monitoring and 6-hour forecast across {cityData.name} stations.
        </p>
      </div>

      {/* Top 3 Weather & Rainfall Cards */}
      <HeroSection cityData={cityData} showHeroText={false} />

      {/* Enlarged Forecast Strip */}
      <RainfallForecastStrip cityData={cityData} />

      {/* Station-level Rainfall Breakdown + Threshold Reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 indra-card p-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#19C3F0]/25 pb-3">
            <CloudRain className="w-5 h-5 text-[#19C3F0] shrink-0" />
            <h2 className="text-lg font-bold text-white leading-snug break-words">
              {cityData.name} Monitoring Zones — Live Intensity
            </h2>
          </div>

          <div className="space-y-3">
            {cityData.mapData.markers.map((station) => {
              const cat = getRainCategory(station.rainfallMm);
              return (
                <div key={station.id} className="indra-card-inner p-3.5 flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-[15px] font-bold text-white">{station.name}</span>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[15px] font-extrabold text-[#19C3F0]">
                      {station.rainfallMm} mm/hr
                    </span>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-semibold rounded border ${cat.bgClass}`}
                    >
                      {cat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-5 indra-card p-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#19C3F0]/25 pb-3">
            <Info className="w-5 h-5 text-[#19C3F0] shrink-0" />
            <h2 className="text-lg font-bold text-white leading-snug break-words">
              Rainfall Classification Rules
            </h2>
          </div>
          <p className="text-[14px] text-slate-200 leading-relaxed">
            Indra uses standardized hourly rainfall thresholds across all cards, forecast strips, and alerts:
          </p>
          <div className="space-y-2.5 text-[14px]">
            <div className="indra-card-inner p-3 flex items-center justify-between gap-2">
              <span className="font-semibold text-[#19C3F0]">Light Rain</span>
              <span className="text-slate-200">Under {RAIN_THRESHOLDS.LIGHT_MAX} mm/hr</span>
            </div>
            <div className="indra-card-inner p-3 flex items-center justify-between gap-2">
              <span className="font-semibold text-[#FDE047]">Moderate Rain</span>
              <span className="text-slate-200">
                {RAIN_THRESHOLDS.LIGHT_MAX} to {RAIN_THRESHOLDS.MODERATE_MAX} mm/hr
              </span>
            </div>
            <div className="indra-card-inner p-3 flex items-center justify-between gap-2">
              <span className="font-semibold text-[#FDBA74]">Heavy Rain</span>
              <span className="text-slate-200">
                7.6 to {RAIN_THRESHOLDS.HEAVY_MAX} mm/hr
              </span>
            </div>
            <div className="indra-card-inner p-3 flex items-center justify-between gap-2">
              <span className="font-semibold text-[#FCA5A5]">Very Heavy Rain</span>
              <span className="text-slate-200">Above {RAIN_THRESHOLDS.HEAVY_MAX} mm/hr</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
