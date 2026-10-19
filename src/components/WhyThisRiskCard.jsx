import React from 'react';
import { Info, CloudRain, Waves, Mountain, History, AlertCircle } from 'lucide-react';
import { RISK_COLORS } from '../data/mock';

const FACTOR_ICONS = {
  CloudRain,
  Waves,
  Mountain,
  History,
};

export default function WhyThisRiskCard({ cityData }) {
  const { riskLevel, factors } = cityData.whyThisRisk;
  const riskStyle = RISK_COLORS[riskLevel] || RISK_COLORS.High;

  return (
    <section
      aria-label={`Why this risk in ${cityData.name}`}
      className="indra-card p-4 sm:p-5 flex flex-col justify-between"
    >
      {/* Header with Risk level pill */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#19C3F0]/25 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#19C3F0]/15 border border-[#19C3F0]/40 flex items-center justify-center text-[#19C3F0]">
            <Info className="w-4 h-4" />
          </div>
          <h2 className="text-[16px] font-bold text-white">Why this risk?</h2>
        </div>

        {/* Risk level: High badge with color + label */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-bold border ${riskStyle.badgeClass}`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Risk level: {riskLevel}</span>
        </div>
      </div>

      {/* 2x2 Grid of 4 Factors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {factors.map((factor) => {
          const IconComponent = FACTOR_ICONS[factor.icon] || CloudRain;
          return (
            <div
              key={factor.id}
              className="indra-card-inner p-3 flex items-center gap-3 hover:border-[#19C3F0]/55 transition"
            >
              <div className="w-9 h-9 rounded-lg bg-[#19C3F0]/15 border border-[#19C3F0]/35 flex items-center justify-center text-[#19C3F0] shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-white leading-tight">{factor.title}</p>
                <p className="text-[14px] text-slate-300 leading-snug mt-0.5">({factor.detail})</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
