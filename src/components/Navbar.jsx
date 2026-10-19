import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BarChart2,
  CloudRain,
  AlertTriangle,
  Bell,
  Users,
  MapPin,
  ChevronDown,
  User,
  Menu,
  X,
} from 'lucide-react';
import IndraLogo from './IndraLogo';
import { CITY_LIST } from '../data/mock';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: BarChart2 },
  { to: '/live-rainfall', label: 'Live Rainfall', icon: CloudRain },
  { to: '/flood-risk', label: 'Flood Risk', icon: AlertTriangle },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/about', label: 'About Us', icon: Users },
];

export default function Navbar({ selectedCity, onSelectCity }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#08152B]/95 backdrop-blur-md border-b border-[#19C3F0]/30 shadow-[0_4px_20px_rgba(0,0,0,0.45)]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo + Name */}
        <div className="flex items-center gap-2.5 shrink-0">
          <NavLink
            to="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19C3F0] rounded-lg"
          >
            <IndraLogo className="w-9 h-9 transition-transform duration-200 group-hover:scale-105" />
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Ind<span className="text-[#19C3F0] underline decoration-[#19C3F0]/60 decoration-2 underline-offset-4">ra</span>
            </span>
          </NavLink>
        </div>

        {/* Desktop Navigation Links (1024px and wider) */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2.5 xl:px-3.5 py-2 rounded-lg text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19C3F0] ${
                  isActive
                    ? 'bg-gradient-to-r from-[#19C3F0]/25 to-[#19C3F0]/10 text-white border border-[#19C3F0]/50 shadow-[0_0_12px_rgba(25,195,240,0.25)]'
                    : 'text-slate-200 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#19C3F0]' : 'text-slate-300'}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* City Selector & Profile Icon */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-[#19C3F0] absolute left-3 pointer-events-none" />
            <label htmlFor="global-city-select" className="sr-only">
              Select monitored city
            </label>
            <select
              id="global-city-select"
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value)}
              className="appearance-none bg-[#0D2142] hover:bg-[#122B54] text-white text-[14px] xl:text-[15px] font-medium pl-8 pr-8 py-1.5 rounded-lg border border-[#19C3F0]/45 shadow-[0_0_10px_rgba(25,195,240,0.15)] focus:outline-none focus:ring-2 focus:ring-[#19C3F0] cursor-pointer transition"
            >
              {CITY_LIST.map((city) => (
                <option key={city} value={city} className="bg-[#0B1A33] text-white">
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-300 absolute right-2.5 pointer-events-none" />
          </div>

          <div
            className="hidden sm:flex w-9 h-9 rounded-full bg-[#0D2142] border border-[#19C3F0]/40 items-center justify-center text-slate-200"
            title="Indra Early Warning Portal"
            aria-hidden="true"
          >
            <User className="w-4 h-4 text-[#19C3F0]" />
          </div>

          {/* Mobile Hamburger Button (only below 1024px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg bg-[#0D2142] border border-[#19C3F0]/40 text-white hover:text-[#19C3F0] focus:outline-none focus:ring-2 focus:ring-[#19C3F0]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation (only below 1024px) */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#08152B] border-b border-[#19C3F0]/30 px-4 pt-2 pb-4 space-y-1"
        >
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[15px] font-medium transition ${
                  isActive
                    ? 'bg-[#19C3F0]/20 text-white border border-[#19C3F0]/50'
                    : 'text-slate-200 hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4 text-[#19C3F0]" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
