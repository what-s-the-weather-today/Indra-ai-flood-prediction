import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import IndraLogo from './IndraLogo';

export default function RiskDonutCard({ cityData, enlarged = false }) {
  const data = cityData.riskShare;
  const chartSize = enlarged ? 210 : 176;
  const innerRadius = enlarged ? 60 : 50;
  const outerRadius = enlarged ? 88 : 76;

  return (
    <section
      aria-label={`Share of ${cityData.name} by risk level`}
      className="indra-card p-4 sm:p-5 flex flex-col justify-between"
    >
      {/* Card Header — wraps cleanly, no city dropdown */}
      <div className="flex items-start gap-2.5 pb-3 border-b border-[#19C3F0]/25">
        <IndraLogo className="w-6 h-6 shrink-0 mt-0.5" />
        <h2 className="text-[16px] font-bold text-white leading-snug break-words">
          Share of {cityData.name} by risk level
        </h2>
      </div>

      {/* Chart + Legend Body — never overlaps */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 ${enlarged ? 'py-4' : ''}`}>
        {/* Donut Chart with "Total Area" centered and animation disabled */}
        <div
          className="relative flex items-center justify-center shrink-0 mx-auto"
          style={{ width: chartSize, height: chartSize }}
        >
          <PieChart width={chartSize} height={chartSize}>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="level"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              stroke="#0B1A33"
              strokeWidth={2}
              startAngle={90}
              endAngle={-270}
              isAnimationActive={false}
            >
              {data.map((entry) => (
                <Cell key={entry.level} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}%`, `${name} Risk`]}
              contentStyle={{
                backgroundColor: '#0B1A33',
                borderColor: 'rgba(25, 195, 240, 0.5)',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '14px',
              }}
              itemStyle={{ color: '#FFFFFF' }}
            />
          </PieChart>

          {/* Center Label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-2">
            <span className="text-[13px] font-semibold text-slate-200 leading-tight">
              Total Area
            </span>
            <span className="text-[14px] font-bold text-white leading-tight mt-0.5">
              {cityData.name}
            </span>
          </div>
        </div>

        {/* Four Risk Segments Legend */}
        <div className="w-full sm:flex-1 space-y-2 min-w-[155px]">
          {data.map((item) => (
            <div
              key={item.level}
              className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#09162C]/70 border border-white/5"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="text-[14px] font-medium text-white">{item.level}</span>
              </div>
              <span className="text-[14px] font-bold text-white">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
