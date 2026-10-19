import React from 'react';
import { MapPinOff, BriefcaseMedical, BellRing } from 'lucide-react';
import IndraLogo from './IndraLogo';
import { APP_INFO } from '../data/mock';

const TIP_ICONS = {
  MapPinOff,
  BriefcaseMedical,
  BellRing,
};

export default function SafetyBanner() {
  return (
    <section
      aria-label="Be Prepared, Stay Safe"
      className="indra-card p-5 sm:p-6 mt-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Shield & Title */}
        <div className="lg:col-span-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#19C3F0]/10 border border-[#19C3F0]/35 flex items-center justify-center shrink-0">
            <IndraLogo className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#19C3F0] tracking-tight">
              Be Prepared, Stay Safe
            </h2>
            <p className="text-[14px] text-slate-200 mt-1 leading-relaxed">
              Follow safety guidelines, keep emergency kits ready, and stay informed with real-time alerts.
            </p>
          </div>
        </div>

        {/* Right Three Tips with distinct icons */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {APP_INFO.safetyTips.map((tip) => {
            const IconComponent = TIP_ICONS[tip.icon] || BellRing;
            return (
              <div
                key={tip.id}
                className="indra-card-inner p-3.5 flex items-start gap-3.5 hover:border-[#19C3F0]/60 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-[#19C3F0]/15 border border-[#19C3F0]/40 flex items-center justify-center text-[#19C3F0] shrink-0 mt-0.5">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-white leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-[14px] text-slate-300 mt-1 leading-snug">
                    {tip.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
