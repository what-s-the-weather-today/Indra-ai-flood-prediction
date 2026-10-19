import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Marker,
  Popup,
  Tooltip as LeafletTooltip,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { Map, Navigation } from 'lucide-react';
import { RISK_COLORS, getRainCategory } from '../data/mock';

// Helper component to smoothly recenter and invalidate map size when city or layout changes
function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    map.setView(center, zoom, { animate: false });
  }, [center, zoom, map]);
  return null;
}

// Custom cyan pin SVG icon for markers
function createCityIcon(riskLevel, isPrimary) {
  const riskColor = RISK_COLORS[riskLevel]?.hex || '#19C3F0';
  const size = isPrimary ? 36 : 28;
  const svgHtml = `
    <div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.8));">
      <svg viewBox="0 0 32 32" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C9.92487 2 5 6.92487 5 13C5 21.25 16 30 16 30C16 30 27 21.25 27 13C27 6.92487 22.0751 2 16 2Z" fill="#0B1A33" stroke="#19C3F0" stroke-width="2.5"/>
        <circle cx="16" cy="13" r="5" fill="${riskColor}" />
      </svg>
    </div>
  `;
  return L.divIcon({
    html: svgHtml,
    className: 'custom-indra-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size - 2],
    popupAnchor: [0, -size + 4],
  });
}

export default function FloodRiskMapCard({
  cityData,
  heightClass = 'h-[460px] sm:h-[500px]',
}) {
  const { center, zoom, mapData } = cityData;

  return (
    <section
      aria-label={`Flood Risk Map for ${cityData.name}`}
      className="indra-card p-4 sm:p-5 flex flex-col justify-between h-full"
    >
      {/* Card Header — no city dropdown */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#19C3F0]/25 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#19C3F0]/15 border border-[#19C3F0]/40 flex items-center justify-center text-[#19C3F0] shrink-0">
            <Map className="w-4 h-4" />
          </div>
          <h2 className="text-[17px] font-bold text-white leading-snug break-words">
            Flood Risk Map — {cityData.name}
          </h2>
        </div>
      </div>

      {/* Map Wrapper */}
      <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden border border-[#19C3F0]/35`}>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          zoomControl={true}
          className="w-full h-full z-10"
        >
          <MapUpdater center={center} zoom={zoom} />

          {/* OpenStreetMap tiles styled for dark flood dashboard */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="indra-map-tiles"
          />

          {/* Layered Flood Risk Corridor Polygons (Low -> Moderate -> High -> Very High) */}
          {mapData.riskZones.map((zone) => (
            <Polygon
              key={zone.id}
              positions={zone.positions}
              pathOptions={{
                color: zone.color,
                weight: 1.5,
                fillColor: zone.color,
                fillOpacity: zone.fillOpacity,
              }}
            >
              <Popup>
                <div className="text-[14px]">
                  <p className="font-bold text-[#19C3F0]">{cityData.name} Basin Corridor</p>
                  <p className="mt-0.5">
                    Flood Risk Level: <span className="font-semibold">{zone.level}</span>
                  </p>
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* River Channel Line */}
          <Polyline
            positions={mapData.riverLine}
            pathOptions={{
              color: '#19C3F0',
              weight: 3.5,
              opacity: 0.9,
              dashArray: '6, 6',
            }}
          >
            <Popup>
              <div className="text-[14px]">
                <p className="font-bold text-[#19C3F0]">Primary River / Drainage Channel</p>
                <p className="text-slate-200">Active water level monitoring corridor</p>
              </div>
            </Popup>
          </Polyline>

          {/* City & Neighborhood Markers (Jaipur, Amer, etc.) */}
          {mapData.markers.map((marker) => {
            const rainCat = getRainCategory(marker.rainfallMm);
            return (
              <Marker
                key={marker.id}
                position={marker.position}
                icon={createCityIcon(marker.risk, marker.isPrimary)}
              >
                <LeafletTooltip
                  permanent
                  direction="top"
                  offset={[0, -24]}
                  className="!bg-[#0B1A33]/90 !text-white !border !border-[#19C3F0]/50 !rounded-md !px-2 !py-0.5 !text-[13px] !font-semibold !shadow-md"
                >
                  {marker.name}
                </LeafletTooltip>
                <Popup>
                  <div className="text-[14px] space-y-1 min-w-[160px]">
                    <p className="font-bold text-base text-white border-b border-white/15 pb-1">
                      {marker.name}
                    </p>
                    <p>
                      Risk Level:{' '}
                      <span
                        className="font-bold"
                        style={{ color: RISK_COLORS[marker.risk]?.hex }}
                      >
                        {marker.risk}
                      </span>
                    </p>
                    <p>
                      Rainfall: <span className="font-semibold">{marker.rainfallMm} mm/hr</span> ({rainCat.label})
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Bottom-Left Flood Risk Level Legend Overlay (clear of top-left zoom buttons and central markers) */}
        <div
          className="absolute bottom-3 left-3 z-[400] bg-[#0B1A33]/92 backdrop-blur-md border border-[#19C3F0]/40 rounded-xl p-2.5 shadow-lg min-w-[140px]"
          aria-label="Map Flood Risk Legend"
        >
          <p className="text-[13px] font-bold text-white mb-1.5 border-b border-white/10 pb-1">
            Flood Risk Level
          </p>
          <ul className="space-y-1 text-[13px]">
            {['Very High', 'High', 'Moderate', 'Low'].map((lvl) => (
              <li key={lvl} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: RISK_COLORS[lvl].hex }}
                  aria-hidden="true"
                />
                <span className="text-white font-medium">{lvl}</span>
              </li>
            ))}
            <li className="flex items-center gap-2 pt-1 border-t border-white/10">
              <span className="w-3 h-0.5 bg-[#19C3F0] shrink-0" aria-hidden="true" />
              <span className="text-[#19C3F0] text-[12px] font-medium">River Line</span>
            </li>
          </ul>
        </div>

        {/* Bottom-Right Compass N Indicator */}
        <div
          className="absolute bottom-7 right-3 z-[400] w-9 h-9 rounded-full bg-[#0B1A33]/90 border border-[#19C3F0]/45 flex flex-col items-center justify-center text-white shadow-md pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-[9px] font-bold text-[#19C3F0] leading-none">N</span>
          <Navigation className="w-3 h-3 text-white -rotate-45 mt-0.5" />
        </div>
      </div>
    </section>
  );
}
