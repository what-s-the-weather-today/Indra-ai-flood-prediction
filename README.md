# Indra — Flood Early Warning & Rainfall Monitoring

**Indra** is an AI-powered flood early warning and rainfall monitoring platform. It provides real-time rainfall monitoring, location-based flood risk mapping, hourly rainfall forecasts, and early alerts.

## Tech Stack
- **React 18 + Vite**
- **Tailwind CSS** (Dark navy `#0B1A33` theme with `#19C3F0` cyan accents and glowing cards)
- **Recharts** (City risk share donut chart)
- **React-Leaflet + OpenStreetMap** (Interactive flood risk corridor polygons, river line, and station markers)
- **lucide-react** (Icons)
- **react-router-dom** (Multi-page navigation: Home, Dashboard, Live Rainfall, Flood Risk, Alerts, About Us)
- **Single Data Source**: All mock data, city profiles (`Jaipur`, `Mumbai`, `Guwahati`), and the unified `getRainCategory(mmPerHour)` helper live in `src/data/mock.js`.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended) and npm

### Installation & Run Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the local URL printed in your terminal (typically `http://localhost:5173`) in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

## Project Team
- **Saksham Agarwal** (Leader)
- **Lakshya Raj Yadav** (Team Member)
- **Nishant Sharma** (Team Member)
