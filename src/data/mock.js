// Central rainfall thresholds and categorization function
// Rule: under 2.5 Light, 2.5 to 7.5 Moderate, 7.6 to 35 Heavy, above 35 Very Heavy.
export const RAIN_THRESHOLDS = {
  LIGHT_MAX: 2.5,
  MODERATE_MAX: 7.5,
  HEAVY_MAX: 35,
};

export function getRainCategory(mmPerHour) {
  const val = Number(mmPerHour);
  if (val < RAIN_THRESHOLDS.LIGHT_MAX) {
    return {
      label: 'Light',
      color: '#19C3F0',
      bgClass: 'bg-[#19C3F0]/15 text-[#19C3F0] border-[#19C3F0]/40',
      barColor: '#19C3F0',
    };
  }
  if (val <= RAIN_THRESHOLDS.MODERATE_MAX) {
    return {
      label: 'Moderate',
      color: '#EAB308',
      bgClass: 'bg-[#EAB308]/15 text-[#FDE047] border-[#EAB308]/40',
      barColor: '#EAB308',
    };
  }
  if (val <= RAIN_THRESHOLDS.HEAVY_MAX) {
    return {
      label: 'Heavy',
      color: '#F97316',
      bgClass: 'bg-[#F97316]/15 text-[#FDBA74] border-[#F97316]/40',
      barColor: '#F97316',
    };
  }
  return {
    label: 'Very Heavy',
    color: '#EF4444',
    bgClass: 'bg-[#EF4444]/15 text-[#FCA5A5] border-[#EF4444]/40',
    barColor: '#EF4444',
  };
}

export function getProbabilityCategory(percent) {
  const val = Number(percent);
  if (val < 30) {
    return {
      label: 'Low',
      bgClass: 'bg-[#22C55E]/15 text-[#86EFAC] border-[#22C55E]/40',
    };
  }
  if (val < 65) {
    return {
      label: 'Moderate',
      bgClass: 'bg-[#EAB308]/15 text-[#FDE047] border-[#EAB308]/40',
    };
  }
  if (val < 85) {
    return {
      label: 'High',
      bgClass: 'bg-[#F97316]/15 text-[#FDBA74] border-[#F97316]/40',
    };
  }
  return {
    label: 'Very High',
    bgClass: 'bg-[#EF4444]/15 text-[#FCA5A5] border-[#EF4444]/40',
  };
}

export const RISK_COLORS = {
  'Very High': { hex: '#EF4444', textClass: 'text-[#EF4444]', bgClass: 'bg-[#EF4444]', badgeClass: 'bg-[#EF4444]/20 text-[#FCA5A5] border-[#EF4444]/40' },
  'High': { hex: '#F97316', textClass: 'text-[#F97316]', bgClass: 'bg-[#F97316]', badgeClass: 'bg-[#F97316]/20 text-[#FDBA74] border-[#F97316]/40' },
  'Moderate': { hex: '#EAB308', textClass: 'text-[#EAB308]', bgClass: 'bg-[#EAB308]', badgeClass: 'bg-[#EAB308]/20 text-[#FDE047] border-[#EAB308]/40' },
  'Low': { hex: '#22C55E', textClass: 'text-[#22C55E]', bgClass: 'bg-[#22C55E]', badgeClass: 'bg-[#22C55E]/20 text-[#86EFAC] border-[#22C55E]/40' },
};

// Helper to generate relative time & formatted current time from minutesAgo
export function formatAlertTimestamp(minutesAgo) {
  const now = new Date();
  const alertDate = new Date(now.getTime() - minutesAgo * 60 * 1000);
  let relative = '';
  if (minutesAgo < 60) {
    relative = `${minutesAgo} mins ago`;
  } else {
    const hrs = Math.round(minutesAgo / 60);
    relative = hrs === 1 ? '1 hour ago' : `${hrs} hours ago`;
  }
  const timeStr = alertDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = alertDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return {
    relative,
    formattedDate: `${timeStr} · ${dateStr}`,
  };
}

export const APP_INFO = {
  name: 'Indra',
  tagline: 'AI-powered flood early warning and rainfall monitoring',
  hero: {
    headlineLine1: 'Know the Rain.',
    headlineLine2: 'Predict the Risk.',
    headlineLine3: 'Stay Safe.',
    subtitle: 'Real-time rainfall monitoring, location-based flood risk prediction and early alerts.',
    ctaText: 'Explore Dashboard',
  },
  safetyTips: [
    {
      id: 'low-lying',
      icon: 'MapPinOff',
      title: 'Avoid low-lying areas during heavy rain',
      description: 'Stay away from underpasses, riverbanks, and flood-prone drainage corridors.',
    },
    {
      id: 'emergency-kit',
      icon: 'BriefcaseMedical',
      title: 'Keep an emergency kit ready',
      description: 'Stock drinking water, non-perishable food, flashlight, power bank, and first aid.',
    },
    {
      id: 'official-alerts',
      icon: 'BellRing',
      title: 'Stay updated with official alerts',
      description: 'Monitor real-time Indra early warnings and local disaster management advisories.',
    },
  ],
  about: {
    summary:
      'Indra is a flood early warning and rainfall monitoring platform. It provides real-time rainfall monitoring, location-based flood risk assessment, and early alerts to help residents and local authorities stay prepared during heavy rain.',
    mission:
      'Our goal is to present clear, reliable weather and flood risk data through real-time rainfall monitoring, location-based flood risk mapping, and early alerts.',
    team: [
      {
        name: 'Saksham Agarwal',
        badge: 'Leader',
      },
      {
        name: 'Lakshya Raj Yadav',
        badge: 'Team Member',
      },
      {
        name: 'Nishant Sharma',
        badge: 'Team Member',
      },
    ],
  },
};

export const CITIES_DATA = {
  Jaipur: {
    name: 'Jaipur',
    state: 'Rajasthan',
    center: [26.9124, 75.7873],
    zoom: 11,
    currentRainfall: {
      mmPerHour: 18,
      periodLabel: 'Last 1 hour',
    },
    forecast3Hr: {
      probabilityPercent: 75,
      summary: 'Heavy to very heavy rainfall expected in the next 3 hours (up to 38 mm/hr)',
    },
    currentWeather: {
      tempC: 28,
      condition: 'Partly Cloudy',
      monsoonNote: 'Monsoon active · High chance of rainfall in next 24 hours',
    },
    overallRiskLevel: 'High',
    riskShare: [
      { level: 'Very High', percentage: 20, color: '#EF4444' },
      { level: 'High', percentage: 35, color: '#F97316' },
      { level: 'Moderate', percentage: 30, color: '#EAB308' },
      { level: 'Low', percentage: 15, color: '#22C55E' },
    ],
    forecastStrip: [
      { timeLabel: 'Now', mm: 18 },
      { timeLabel: '1 hr', mm: 6.5 },
      { timeLabel: '2 hrs', mm: 32 },
      { timeLabel: '3 hrs', mm: 38 },
      { timeLabel: '6 hrs', mm: 1.8 },
    ],
    alerts: [
      {
        id: 'jpr-1',
        title: 'Heavy to Very Heavy Rainfall Expected in Next 3 Hours',
        priority: 'High Priority',
        riskLevel: 'Very High',
        message: 'With a 75% (High) 3-hour rain probability, rainfall is forecast to intensify from 18 mm/hr (Heavy) now to 32 mm/hr (Heavy) in 2 hrs and 38 mm/hr (Very Heavy) in 3 hrs.',
        minutesAgo: 25,
      },
      {
        id: 'jpr-2',
        title: 'Rising Water Levels in Dravyavati River Basin',
        priority: 'Medium',
        riskLevel: 'High',
        message: 'River water level is increasing along the Dravyavati corridor near Sanganer and Tonk Road due to sustained heavy rain (18 mm/hr).',
        minutesAgo: 120,
      },
      {
        id: 'jpr-3',
        title: 'Temporary Moderate Rain Before Peak Downpour',
        priority: 'Advisory',
        riskLevel: 'Moderate',
        message: 'Rainfall will briefly ease to 6.5 mm/hr (Moderate) at 1 hr before increasing to 32–38 mm/hr, then tapering to 1.8 mm/hr (Light) by 6 hrs.',
        minutesAgo: 180,
      },
    ],
    whyThisRisk: {
      riskLevel: 'High',
      factors: [
        { id: 'rainfall', title: 'Rainfall', detail: 'heavy intensity (18 mm/hr)', icon: 'CloudRain' },
        { id: 'river', title: 'River level', detail: 'rising (Dravyavati river)', icon: 'Waves' },
        { id: 'elevation', title: 'Elevation', detail: 'low-lying areas', icon: 'Mountain' },
        { id: 'history', title: 'Past floods', detail: 'historical data', icon: 'History' },
      ],
    },
    mapData: {
      markers: [
        { id: 'jaipur-main', name: 'Jaipur', position: [26.9124, 75.7873], risk: 'High', rainfallMm: 18, isPrimary: true },
        { id: 'amer', name: 'Amer', position: [26.9855, 75.8513], risk: 'Moderate', rainfallMm: 6.5, isPrimary: false },
        { id: 'sanganer', name: 'Sanganer', position: [26.8195, 75.7881], risk: 'Very High', rainfallMm: 38, isPrimary: false },
        { id: 'tonk-road', name: 'Tonk Road', position: [26.8540, 75.8120], risk: 'High', rainfallMm: 32, isPrimary: false },
      ],
      riverLine: [
        [27.0150, 75.7450],
        [26.9850, 75.7580],
        [26.9550, 75.7680],
        [26.9300, 75.7750],
        [26.9050, 75.7880],
        [26.8800, 75.8050],
        [26.8500, 75.8220],
        [26.8200, 75.8050],
        [26.7950, 75.8350],
      ],
      riskZones: [
        {
          id: 'jpr-zone-low',
          level: 'Low',
          color: '#22C55E',
          fillOpacity: 0.22,
          positions: [
            [27.0250, 75.7100],
            [27.0300, 75.7850],
            [26.9600, 75.8300],
            [26.8900, 75.8650],
            [26.7850, 75.8750],
            [26.7750, 75.7850],
            [26.8450, 75.7350],
            [26.9400, 75.7150],
          ],
        },
        {
          id: 'jpr-zone-moderate',
          level: 'Moderate',
          color: '#EAB308',
          fillOpacity: 0.30,
          positions: [
            [27.0180, 75.7250],
            [27.0200, 75.7700],
            [26.9550, 75.8100],
            [26.8850, 75.8450],
            [26.7900, 75.8550],
            [26.7850, 75.7950],
            [26.8550, 75.7550],
            [26.9450, 75.7320],
          ],
        },
        {
          id: 'jpr-zone-high',
          level: 'High',
          color: '#F97316',
          fillOpacity: 0.42,
          positions: [
            [27.0050, 75.7350],
            [27.0080, 75.7600],
            [26.9480, 75.7920],
            [26.8820, 75.8280],
            [26.8050, 75.8380],
            [26.8000, 75.8020],
            [26.8680, 75.7720],
            [26.9420, 75.7480],
          ],
        },
        {
          id: 'jpr-zone-very-high',
          level: 'Very High',
          color: '#EF4444',
          fillOpacity: 0.58,
          positions: [
            [27.0920 ? 26.9920 : 26.9920, 75.7440],
            [26.9940, 75.7550],
            [26.9400, 75.7800],
            [26.8780, 75.8160],
            [26.8180, 75.8250],
            [26.8150, 75.8080],
            [26.8750, 75.7880],
            [26.9380, 75.7600],
          ],
        },
      ],
    },
  },

  Mumbai: {
    name: 'Mumbai',
    state: 'Maharashtra',
    center: [19.0760, 72.8777],
    zoom: 11,
    currentRainfall: {
      mmPerHour: 42,
      periodLabel: 'Last 1 hour',
    },
    forecast3Hr: {
      probabilityPercent: 88,
      summary: 'Very heavy to heavy coastal rain continuing over next 3 hours',
    },
    currentWeather: {
      tempC: 25,
      condition: 'Heavy Squalls',
      monsoonNote: 'Monsoon active · High tide warning in effect for next 24 hours',
    },
    overallRiskLevel: 'Very High',
    riskShare: [
      { level: 'Very High', percentage: 35, color: '#EF4444' },
      { level: 'High', percentage: 35, color: '#F97316' },
      { level: 'Moderate', percentage: 20, color: '#EAB308' },
      { level: 'Low', percentage: 10, color: '#22C55E' },
    ],
    forecastStrip: [
      { timeLabel: 'Now', mm: 42 },
      { timeLabel: '1 hr', mm: 48 },
      { timeLabel: '2 hrs', mm: 30 },
      { timeLabel: '3 hrs', mm: 19 },
      { timeLabel: '6 hrs', mm: 6.0 },
    ],
    alerts: [
      {
        id: 'mum-1',
        title: 'Very Heavy Coastal Downpour Active Across Mumbai',
        priority: 'High Priority',
        riskLevel: 'Very High',
        message: 'With an 88% (Very High) 3-hour rain probability, current rainfall of 42 mm/hr (Very Heavy) is forecast to peak at 48 mm/hr (Very Heavy) in 1 hr.',
        minutesAgo: 15,
      },
      {
        id: 'mum-2',
        title: 'Mithi River Corridor Nearing High Water Mark',
        priority: 'High Priority',
        riskLevel: 'High',
        message: 'Continued heavy rain of 30 mm/hr (Heavy) in 2 hrs and 19 mm/hr (Heavy) in 3 hrs is causing waterlogging in low-lying Kurla and Sion zones.',
        minutesAgo: 75,
      },
      {
        id: 'mum-3',
        title: 'Rainfall Tapering to Moderate Intensity by 6 Hours',
        priority: 'Medium',
        riskLevel: 'Moderate',
        message: 'Hourly rainfall is projected to ease from 19 mm/hr (Heavy) at 3 hrs down to 6.0 mm/hr (Moderate) by 6 hrs.',
        minutesAgo: 140,
      },
    ],
    whyThisRisk: {
      riskLevel: 'Very High',
      factors: [
        { id: 'rainfall', title: 'Rainfall', detail: 'very heavy (42 mm/hr)', icon: 'CloudRain' },
        { id: 'river', title: 'River level', detail: 'rising (Mithi river basin)', icon: 'Waves' },
        { id: 'elevation', title: 'Elevation', detail: 'low-lying coastal areas', icon: 'Mountain' },
        { id: 'history', title: 'Past floods', detail: 'historical data', icon: 'History' },
      ],
    },
    mapData: {
      markers: [
        { id: 'mumbai-main', name: 'Mumbai (Kurla)', position: [19.0726, 72.8793], risk: 'Very High', rainfallMm: 42, isPrimary: true },
        { id: 'powai', name: 'Powai', position: [19.1176, 72.9060], risk: 'High', rainfallMm: 30, isPrimary: false },
        { id: 'bandra', name: 'Bandra Creek', position: [19.0596, 72.8495], risk: 'Very High', rainfallMm: 48, isPrimary: false },
      ],
      riverLine: [
        [19.1450, 72.8980],
        [19.1200, 72.8920],
        [19.0950, 72.8850],
        [19.0726, 72.8793],
        [19.0620, 72.8630],
        [19.0520, 72.8420],
      ],
      riskZones: [
        {
          id: 'mum-zone-low',
          level: 'Low',
          color: '#22C55E',
          fillOpacity: 0.22,
          positions: [
            [19.1600, 72.8500],
            [19.1600, 72.9350],
            [19.0400, 72.9200],
            [19.0350, 72.8250],
          ],
        },
        {
          id: 'mum-zone-moderate',
          level: 'Moderate',
          color: '#EAB308',
          fillOpacity: 0.30,
          positions: [
            [19.1500, 72.8650],
            [19.1500, 72.9200],
            [19.0450, 72.9000],
            [19.0420, 72.8350],
          ],
        },
        {
          id: 'mum-zone-high',
          level: 'High',
          color: '#F97316',
          fillOpacity: 0.42,
          positions: [
            [19.1450, 72.8800],
            [19.1420, 72.9080],
            [19.0520, 72.8850],
            [19.0480, 72.8420],
          ],
        },
        {
          id: 'mum-zone-very-high',
          level: 'Very High',
          color: '#EF4444',
          fillOpacity: 0.58,
          positions: [
            [19.1380, 72.8880],
            [19.1350, 72.9000],
            [19.0580, 72.8750],
            [19.0520, 72.8480],
          ],
        },
      ],
    },
  },

  Guwahati: {
    name: 'Guwahati',
    state: 'Assam',
    center: [26.1445, 91.7362],
    zoom: 12,
    currentRainfall: {
      mmPerHour: 6.2,
      periodLabel: 'Last 1 hour',
    },
    forecast3Hr: {
      probabilityPercent: 58,
      summary: 'Moderate showers intensifying to heavy rain in 2 hours',
    },
    currentWeather: {
      tempC: 26,
      condition: 'Overcast & Humid',
      monsoonNote: 'Monsoon active · Brahmaputra tributary watch in effect',
    },
    overallRiskLevel: 'Moderate',
    riskShare: [
      { level: 'Very High', percentage: 12, color: '#EF4444' },
      { level: 'High', percentage: 28, color: '#F97316' },
      { level: 'Moderate', percentage: 40, color: '#EAB308' },
      { level: 'Low', percentage: 20, color: '#22C55E' },
    ],
    forecastStrip: [
      { timeLabel: 'Now', mm: 6.2 },
      { timeLabel: '1 hr', mm: 7.0 },
      { timeLabel: '2 hrs', mm: 16 },
      { timeLabel: '3 hrs', mm: 12 },
      { timeLabel: '6 hrs', mm: 2.1 },
    ],
    alerts: [
      {
        id: 'guw-1',
        title: 'Rainfall Building from Moderate to Heavy Intensity',
        priority: 'Medium',
        riskLevel: 'High',
        message: 'With a 58% (Moderate) 3-hour rain probability, current rain of 6.2 mm/hr (Moderate) and 7.0 mm/hr (Moderate) at 1 hr will reach 16 mm/hr (Heavy) in 2 hrs.',
        minutesAgo: 40,
      },
      {
        id: 'guw-2',
        title: 'Bharalu River Basin Drainage Watch',
        priority: 'Medium',
        riskLevel: 'Moderate',
        message: 'Heavy rainfall of 16 mm/hr at 2 hrs and 12 mm/hr (Heavy) at 3 hrs may cause slow drainage along low-lying Bharalu channels.',
        minutesAgo: 110,
      },
      {
        id: 'guw-3',
        title: 'Conditions Easing to Light Rain by 6 Hours',
        priority: 'Advisory',
        riskLevel: 'Low',
        message: 'Hourly rainfall is projected to decrease to 2.1 mm/hr (Light) by 6 hrs.',
        minutesAgo: 210,
      },
    ],
    whyThisRisk: {
      riskLevel: 'Moderate',
      factors: [
        { id: 'rainfall', title: 'Rainfall', detail: 'moderate intensity (6.2 mm/hr)', icon: 'CloudRain' },
        { id: 'river', title: 'River level', detail: 'rising (Bharalu & Brahmaputra)', icon: 'Waves' },
        { id: 'elevation', title: 'Elevation', detail: 'low-lying valley areas', icon: 'Mountain' },
        { id: 'history', title: 'Past floods', detail: 'historical data', icon: 'History' },
      ],
    },
    mapData: {
      markers: [
        { id: 'guwahati-main', name: 'Guwahati', position: [26.1445, 91.7362], risk: 'Moderate', rainfallMm: 6.2, isPrimary: true },
        { id: 'dispur', name: 'Dispur', position: [26.1433, 91.7898], risk: 'High', rainfallMm: 16, isPrimary: false },
        { id: 'jalukbari', name: 'Jalukbari', position: [26.1584, 91.6682], risk: 'Low', rainfallMm: 2.1, isPrimary: false },
      ],
      riverLine: [
        [26.1850, 91.6750],
        [26.1780, 91.7150],
        [26.1650, 91.7450],
        [26.1480, 91.7680],
        [26.1350, 91.7980],
      ],
      riskZones: [
        {
          id: 'guw-zone-low',
          level: 'Low',
          color: '#22C55E',
          fillOpacity: 0.22,
          positions: [
            [26.1950, 91.6650],
            [26.1980, 91.7550],
            [26.1500, 91.8150],
            [26.1150, 91.7950],
            [26.1350, 91.6750],
          ],
        },
        {
          id: 'guw-zone-moderate',
          level: 'Moderate',
          color: '#EAB308',
          fillOpacity: 0.30,
          positions: [
            [26.1880, 91.6800],
            [26.1890, 91.7500],
            [26.1480, 91.8050],
            [26.1220, 91.7880],
            [26.1420, 91.6900],
          ],
        },
        {
          id: 'guw-zone-high',
          level: 'High',
          color: '#F97316',
          fillOpacity: 0.42,
          positions: [
            [26.1800, 91.6950],
            [26.1820, 91.7450],
            [26.1450, 91.7980],
            [26.1280, 91.7820],
            [26.1500, 91.7050],
          ],
        },
        {
          id: 'guw-zone-very-high',
          level: 'Very High',
          color: '#EF4444',
          fillOpacity: 0.58,
          positions: [
            [26.1750, 91.7100],
            [26.1760, 91.7420],
            [26.1420, 91.7900],
            [26.1340, 91.7780],
            [26.1580, 91.7200],
          ],
        },
      ],
    },
  },
};

export const CITY_LIST = Object.keys(CITIES_DATA);

export const CHAT_QUICK_REPLIES = [
  'Current rainfall',
  '3-hour forecast',
  'Flood risk level',
  'Safety tips',
  'Compare other cities',
];

export function generateAssistantReply(userText, currentCityKey) {
  const city = CITIES_DATA[currentCityKey] || CITIES_DATA.Jaipur;
  const q = (userText || '').toLowerCase();

  // Check if user mentions a specific other city in mock data
  const mentionedCityKey = CITY_LIST.find(
    (c) => c.toLowerCase() !== currentCityKey.toLowerCase() && q.includes(c.toLowerCase())
  );

  if (mentionedCityKey || q.includes('other cit') || q.includes('compare') || q.includes('cities')) {
    if (mentionedCityKey) {
      const target = CITIES_DATA[mentionedCityKey];
      const cat = getRainCategory(target.currentRainfall.mmPerHour);
      return {
        text: `In ${target.name}, current rainfall is ${target.currentRainfall.mmPerHour} mm/hr (${cat.label}), 3-hour rain probability is ${target.forecast3Hr.probabilityPercent}%, and the overall flood risk is ${target.overallRiskLevel}. You can switch the top city selector to ${target.name} to inspect its full map and alerts.`,
        riskBadge: target.overallRiskLevel,
      };
    }
    const summaries = CITY_LIST.map((cKey) => {
      const c = CITIES_DATA[cKey];
      const cat = getRainCategory(c.currentRainfall.mmPerHour);
      return `${c.name}: ${c.currentRainfall.mmPerHour} mm/hr (${cat.label}), Risk: ${c.overallRiskLevel}`;
    }).join(' | ');
    return {
      text: `Here is the live comparison across monitored cities — ${summaries}. Use the city dropdown in the navigation bar to switch views.`,
      riskBadge: city.overallRiskLevel,
    };
  }

  if (q.includes('rain') && !q.includes('forecast')) {
    const cat = getRainCategory(city.currentRainfall.mmPerHour);
    return {
      text: `The current rainfall in ${city.name} is ${city.currentRainfall.mmPerHour} mm/hr (${city.currentRainfall.periodLabel.toLowerCase()}), which is categorized as ${cat.label}. Weather is ${city.currentWeather.tempC}°C and ${city.currentWeather.condition.toLowerCase()}.`,
      riskBadge: null,
    };
  }

  if (q.includes('forecast') || q.includes('next') || q.includes('hour') || q.includes('probabilit')) {
    const stripSummary = city.forecastStrip
      .map((s) => `${s.timeLabel}: ${s.mm} mm/hr (${getRainCategory(s.mm).label})`)
      .join(', ');
    return {
      text: `For ${city.name}, the 3-hour rain probability is ${city.forecast3Hr.probabilityPercent}% (${getProbabilityCategory(city.forecast3Hr.probabilityPercent).label}). Hourly forecast — ${stripSummary}.`,
      riskBadge: null,
    };
  }

  if (q.includes('risk') || q.includes('flood') || q.includes('why') || q.includes('level') || q.includes('alert')) {
    const shareText = city.riskShare.map((r) => `${r.level}: ${r.percentage}%`).join(', ');
    const factorsText = city.whyThisRisk.factors.map((f) => `${f.title} (${f.detail})`).join(', ');
    return {
      text: `The flood risk level in ${city.name} right now is ${city.overallRiskLevel}. Area breakdown: ${shareText}. Key drivers: ${factorsText}.`,
      riskBadge: city.overallRiskLevel,
    };
  }

  if (q.includes('safe') || q.includes('tip') || q.includes('prepar') || q.includes('emergency') || q.includes('help')) {
    const tips = APP_INFO.safetyTips.map((t, i) => `${i + 1}. ${t.title}`).join(' ');
    return {
      text: `Key flood safety guidelines for ${city.name}: ${tips}`,
      riskBadge: null,
    };
  }

  const cat = getRainCategory(city.currentRainfall.mmPerHour);
  return {
    text: `Indra is an AI-powered flood early warning and rainfall monitoring platform. In ${city.name}, current rainfall is ${city.currentRainfall.mmPerHour} mm/hr (${cat.label}) with a ${city.overallRiskLevel} flood risk level. Ask me about "current rainfall", "forecast", "flood risk", "safety tips", or "other cities".`,
    riskBadge: city.overallRiskLevel,
  };
}
