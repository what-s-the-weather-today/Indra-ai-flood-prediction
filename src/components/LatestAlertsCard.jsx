import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { RISK_COLORS, formatAlertTimestamp } from '../data/mock';

export default function LatestAlertsCard({ cityData, showViewAll = true }) {
  return (
    <section
      aria-label={`Latest Alerts for ${cityData.name}`}
      className="indra-card p-4 sm:p-5 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#19C3F0]/25 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#19C3F0]/15 border border-[#19C3F0]/40 flex items-center justify-center text-[#19C3F0] shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <h2 className="text-[16px] font-bold text-white leading-snug break-words">
            Latest Alerts
          </h2>
        </div>

        {showViewAll && (
          <Link
            to="/alerts"
            className="inline-flex items-center gap-1 text-[14px] font-medium text-[#19C3F0] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19C3F0] rounded px-1 shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Three Alert Cards — alert headings wrap onto two lines without truncation */}
      <div className="space-y-3">
        {cityData.alerts.map((alert) => {
          const riskStyle = RISK_COLORS[alert.riskLevel] || RISK_COLORS.High;
          const timeInfo = formatAlertTimestamp(alert.minutesAgo);
          const isHigh = alert.riskLevel === 'Very High' || alert.priority === 'High Priority';

          return (
            <article
              key={alert.id}
              className={`rounded-xl p-3.5 border transition ${
                isHigh
                  ? 'bg-gradient-to-r from-[#EF4444]/15 via-[#0B1A33]/90 to-[#0B1A33]/90 border-[#EF4444]/50'
                  : 'indra-card-inner'
              }`}
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2 min-w-0 flex-1">
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${riskStyle.hex}25`,
                      color: riskStyle.hex,
                    }}
                    aria-hidden="true"
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                  <h3
                    className="text-[15px] font-bold leading-snug break-words"
                    style={{ color: isHigh ? '#FCA5A5' : '#FFFFFF' }}
                  >
                    {alert.title}
                  </h3>
                </div>

                {/* Priority Tag */}
                <span
                  className={`shrink-0 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${riskStyle.badgeClass}`}
                >
                  {alert.priority}
                </span>
              </div>

              <p className="text-[14px] text-slate-200 mt-1.5 leading-relaxed break-words">
                {alert.message}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-1.5 border-t border-white/10 text-[13px] text-slate-300">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#19C3F0]">
                  <Clock className="w-3.5 h-3.5" />
                  {timeInfo.relative}
                </span>
                <span>{timeInfo.formattedDate}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
