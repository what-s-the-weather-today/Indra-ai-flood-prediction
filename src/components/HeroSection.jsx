import React from 'react';
import { CloudRain, CalendarClock, CloudSun, ArrowRight } from 'lucide-react';
import { APP_INFO, getRainCategory, getProbabilityCategory } from '../data/mock';

export default function HeroSection({ cityData, onExploreClick, showHeroText = true }) {
  const rainCat = getRainCategory(cityData.currentRainfall.mmPerHour);
  const probCat = getProbabilityCategory(cityData.forecast3Hr.probabilityPercent);

  return (
    <section
      aria-label="Hero and Current Conditions"
      className="relative overflow-hidden rounded-2xl border border-[#19C3F0]/30 shadow-cyan-glow mb-4"
      style={{
        backgroundImage: showHeroText
          ? `
            linear-gradient(90deg, rgba(7, 17, 34, 0.94) 0%, rgba(11, 26, 51, 0.78) 42%, rgba(11, 26, 51, 0.22) 72%, rgba(11, 26, 51, 0.15) 100%),
            url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1800&q=80')
          `
          : `
            linear-gradient(90deg, rgba(7, 17, 34, 0.85) 0%, rgba(11, 26, 51, 0.55) 100%),
            url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1800&q=80')
          `,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
      }}
    >
      <div className="relative z-10 px-4 py-3.5 sm:px-6 sm:py-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-center">
          {/* Left Hero Copy (Section 1) — compact height */}
          {showHeroText && (
            <div className="xl:col-span-5 space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold leading-[1.15] tracking-tight text-white">
                <span className="block">{APP_INFO.hero.headlineLine1}</span>
                <span className="block text-[#19C3F0] drop-shadow-[0_0_14px_rgba(25,195,240,0.45)]">
                  {APP_INFO.hero.headlineLine2}
                </span>
                <span className="block">{APP_INFO.hero.headlineLine3}</span>
              </h1>

              <p className="text-[14px] sm:text-[15px] text-slate-100 max-w-xl leading-snug">
                {APP_INFO.hero.subtitle}
              </p>

              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#19C3F0] to-[#0EA5E9] hover:from-[#38BDF8] hover:to-[#19C3F0] text-[#071326] font-bold text-[14px] shadow-[0_0_20px_rgba(25,195,240,0.5)] hover:shadow-[0_0_26px_rgba(25,195,240,0.75)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{APP_INFO.hero.ctaText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}

          {/* Right Three Summary Cards (Section 2) — compact height, no progress bars, no truncated text */}
          <div
            className={`${
              showHeroText ? 'xl:col-span-7' : 'xl:col-span-12'
            } grid grid-cols-1 md:grid-cols-3 gap-3.5`}
          >
            {/* Card 1: Current Rainfall */}
            <article className="indra-card p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#19C3F0]/15 border border-[#19C3F0]/35 flex items-center justify-center text-[#19C3F0] shrink-0">
                  <CloudRain className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] font-semibold text-white leading-snug">
                  Current Rainfall
                </h2>
              </div>

              <div className="mt-2">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight">
                    {cityData.currentRainfall.mmPerHour}
                  </span>
                  <span className="text-lg font-bold text-[#19C3F0]">mm/hr</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-1.5 flex-wrap">
                  <span className="text-[14px] text-slate-200">
                    ({cityData.currentRainfall.periodLabel})
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${rainCat.bgClass}`}
                  >
                    {rainCat.label}
                  </span>
                </div>
              </div>
            </article>

            {/* Card 2: Forecast (Next 3 hrs) */}
            <article className="indra-card p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#19C3F0]/15 border border-[#19C3F0]/35 flex items-center justify-center text-[#19C3F0] shrink-0">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] font-semibold text-white leading-snug">
                  Forecast <span className="text-[13px] font-normal text-slate-300">(Next 3 hrs)</span>
                </h2>
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight">
                    {cityData.forecast3Hr.probabilityPercent}%
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${probCat.bgClass}`}
                  >
                    {probCat.label}
                  </span>
                </div>
                <p className="text-[14px] text-slate-200 mt-1.5">Rain Probability (Next 3 hrs)</p>
              </div>
            </article>

            {/* Card 3: Current Weather (with wrapping "Monsoon active" line inside) */}
            <article className="indra-card p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#19C3F0]/15 border border-[#19C3F0]/35 flex items-center justify-center text-[#19C3F0] shrink-0">
                  <CloudSun className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] font-semibold text-white leading-snug">
                  Current Weather
                </h2>
              </div>

              <div className="mt-1.5">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight">
                    {cityData.currentWeather.tempC}°C
                  </span>
                  <span className="text-[14px] font-medium text-slate-100">
                    {cityData.currentWeather.condition}
                  </span>
                </div>
              </div>

              {/* Small Monsoon active line inside Current Weather card — wraps onto two lines, never truncated */}
              <div className="mt-2 pt-1.5 border-t border-[#19C3F0]/20 flex items-start gap-2 text-[14px] text-[#19C3F0] leading-snug">
                <span className="w-2 h-2 rounded-full bg-[#19C3F0] shrink-0 mt-1.5" />
                <span className="font-medium break-words">
                  {cityData.currentWeather.monsoonNote}
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
