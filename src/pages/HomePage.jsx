import React, { useRef } from 'react';
import HeroSection from '../components/HeroSection';
import RiskDonutCard from '../components/RiskDonutCard';
import FloodRiskMapCard from '../components/FloodRiskMapCard';
import RainfallForecastStrip from '../components/RainfallForecastStrip';
import LatestAlertsCard from '../components/LatestAlertsCard';
import WhyThisRiskCard from '../components/WhyThisRiskCard';
import SafetyBanner from '../components/SafetyBanner';
import { CITIES_DATA } from '../data/mock';

export default function HomePage({ selectedCity }) {
  const dashboardRef = useRef(null);
  const cityData = CITIES_DATA[selectedCity] || CITIES_DATA.Jaipur;

  const handleExploreDashboard = () => {
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. Hero + 2. Three Summary Cards */}
      <HeroSection
        cityData={cityData}
        onExploreClick={handleExploreDashboard}
        showHeroText={true}
      />

      {/* Main Dashboard Grid:
          DOM Order strictly follows:
          3. Share of <City> by risk level (Donut chart)
          4. Flood Risk Map (React-Leaflet)
          5. Rainfall Forecast strip
          6. Latest Alerts
          7. "Why this risk?" box
      */}
      <div
        id="dashboard-section"
        ref={dashboardRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch scroll-mt-20"
      >
        {/* 3. Share of Jaipur by risk level (Top-Left on Desktop) */}
        <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1 flex flex-col">
          <RiskDonutCard cityData={cityData} />
        </div>

        {/* 4. Flood Risk Map (Center spanning 2 rows on Desktop) */}
        <div className="lg:col-span-4 lg:col-start-5 lg:row-start-1 lg:row-span-2 flex flex-col">
          <FloodRiskMapCard
            cityData={cityData}
            heightClass="h-[460px] lg:h-full min-h-[460px]"
          />
        </div>

        {/* 5. Rainfall Forecast strip (Bottom-Left on Desktop) */}
        <div className="lg:col-span-4 lg:col-start-1 lg:row-start-2 flex flex-col">
          <RainfallForecastStrip cityData={cityData} />
        </div>

        {/* 6. Latest Alerts (Top-Right on Desktop) */}
        <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1 flex flex-col">
          <LatestAlertsCard cityData={cityData} showViewAll={true} />
        </div>

        {/* 7. "Why this risk?" box (Bottom-Right on Desktop) */}
        <div className="lg:col-span-4 lg:col-start-9 lg:row-start-2 flex flex-col">
          <WhyThisRiskCard cityData={cityData} />
        </div>
      </div>

      {/* 8. "Be Prepared, Stay Safe" banner */}
      <SafetyBanner />
    </div>
  );
}
