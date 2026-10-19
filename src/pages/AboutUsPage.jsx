import React from 'react';
import { ShieldCheck, Users, Award, CloudRain, MapPinned, Bell } from 'lucide-react';
import IndraLogo from '../components/IndraLogo';
import { APP_INFO } from '../data/mock';

export default function AboutUsPage() {
  const { about } = APP_INFO;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="indra-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#19C3F0]/15 border border-[#19C3F0]/45 flex items-center justify-center shrink-0">
            <IndraLogo className="w-11 h-11" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              About {APP_INFO.name}
            </h1>
            <p className="text-[16px] font-medium text-[#19C3F0]">{APP_INFO.tagline}</p>
            <p className="text-[15px] text-slate-200 leading-relaxed max-w-4xl pt-1">
              {about.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Core Features in plain terms: real-time rainfall monitoring, location-based flood risk, and early alerts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="indra-card p-5 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#19C3F0]/15 border border-[#19C3F0]/40 flex items-center justify-center text-[#19C3F0]">
            <CloudRain className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Real-Time Rainfall Monitoring</h2>
          <p className="text-[14px] text-slate-300 leading-relaxed">
            Tracks current rainfall in mm/hr and hourly forecasts with clear intensity categories from Light to Very Heavy.
          </p>
        </div>

        <div className="indra-card p-5 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#19C3F0]/15 border border-[#19C3F0]/40 flex items-center justify-center text-[#19C3F0]">
            <MapPinned className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Location-Based Flood Risk</h2>
          <p className="text-[14px] text-slate-300 leading-relaxed">
            Maps flood risk zones across low-lying areas and river corridors into Very High, High, Moderate, and Low risk levels.
          </p>
        </div>

        <div className="indra-card p-5 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#19C3F0]/15 border border-[#19C3F0]/40 flex items-center justify-center text-[#19C3F0]">
            <Bell className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Early Alerts</h2>
          <p className="text-[14px] text-slate-300 leading-relaxed">
            Provides timely flood warnings and practical safety tips matched to the upcoming rainfall forecast.
          </p>
        </div>
      </section>

      {/* Team Section — only Name and Leader / Team Member tag */}
      <section className="indra-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-[#19C3F0]/25 pb-4">
          <div className="w-9 h-9 rounded-lg bg-[#19C3F0]/15 border border-[#19C3F0]/40 flex items-center justify-center text-[#19C3F0]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Project Team</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {about.team.map((member) => {
            const isLeader = member.badge === 'Leader';
            return (
              <article
                key={member.name}
                className={`rounded-xl p-5 border transition flex items-center justify-between gap-4 ${
                  isLeader
                    ? 'bg-gradient-to-b from-[#19C3F0]/15 to-[#09172E] border-[#19C3F0]/60 shadow-cyan-glow'
                    : 'indra-card-inner'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-[#19C3F0]/20 border border-[#19C3F0]/50 flex items-center justify-center text-[#19C3F0] font-extrabold text-lg shrink-0">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <h3 className="text-lg font-extrabold text-white leading-snug break-words">
                    {member.name}
                  </h3>
                </div>

                {isLeader ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#19C3F0] text-[#071326] shrink-0">
                    <Award className="w-3.5 h-3.5" />
                    <span>Leader</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#19C3F0]/15 text-[#19C3F0] border border-[#19C3F0]/35 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Team Member</span>
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
