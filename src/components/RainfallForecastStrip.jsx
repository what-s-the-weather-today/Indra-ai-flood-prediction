import React from 'react';
import { BarChart2, CloudRain, CloudDrizzle, CloudLightning } from 'lucide-react';
import { getRainCategory } from '../data/mock';

function RainSlotIcon({ categoryLabel }) {
  if (categoryLabel === 'Light') {
    return <CloudDrizzle className="w-7 h-7 text-[#19C3F0]" />;
  }
  if (categoryLabel === 'Very Heavy') {
    return <CloudLightning className="w-7 h-7 text-[#19C3F0]" />;
  }
  return <CloudRain className="w-7 h-7 text-[#19C3F0]" />;
}

export default function RainfallForecastStrip({ cityData }) {
  return (
    <section
      aria-label={`Rainfall Forecast for ${cityData.name}`}
      className="indra-card p-4 sm:p-5 flex flex-col justify-between"
    >
      {/* Header — no local city dropdown */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#19C3F0]/25 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#19C3F0]/15 border border-[#19C3F0]/40 flex items-center justify-center text-[#19C3F0] shrink-0">
            <BarChart2 className="w-4 h-4" />
          </div>
          <h2 className="text-[16px] font-bold text-white leading-snug break-words">
            Rainfall Forecast (mm/hr)
          </h2>
        </div>
      </div>

      {/* 5 Forecast Slots: Now, 1 hr, 2 hrs, 3 hrs, 6 hrs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {cityData.forecastStrip.map((slot) => {
          const cat = getRainCategory(slot.mm);
          return (
            <div
              key={slot.timeLabel}
              className="indra-card-inner p-2.5 flex flex-col items-center justify-between text-center hover:border-[#19C3F0]/60 transition"
            >
              <span className="text-[14px] font-semibold text-slate-200">{slot.timeLabel}</span>

              <div className="my-2">
                <RainSlotIcon categoryLabel={cat.label} />
              </div>

              <span className="text-[14px] font-extrabold text-white mb-1.5 leading-tight">
                {slot.mm} mm/hr
              </span>

              <span
                className={`w-full px-1.5 py-0.5 text-[12px] font-semibold rounded border text-center leading-tight ${cat.bgClass}`}
              >
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
