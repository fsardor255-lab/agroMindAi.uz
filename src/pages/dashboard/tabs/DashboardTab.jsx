import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';

export default function DashboardTab({ stats, chartPoints, activeChartPoint, setActiveChartPoint, setActiveTab }) {
  const { t } = useContext(LanguageContext);

  return (
    <>
      {/* KPI Telemetry Cards Row */}
      <div className="farmer-kpi-grid">
        {/* Crop Health */}
        <div className="farmer-kpi-card border-green">
          <div className="kpi-icon-wrapper bg-green-light">
            <span className="kpi-icon">🌱</span>
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">{t('kpi_crop_health')}</span>
            <h3>{stats.cropHealth}</h3>
            <div className="kpi-status-trend">
              <span className="lbl">{t('status_juda_yaxshi')}</span>
              <span className="trend green-text">↑ {stats.cropHealthTrend}</span>
            </div>
          </div>
        </div>

        {/* Water Reserve */}
        <div className="farmer-kpi-card border-blue">
          <div className="kpi-icon-wrapper bg-blue-light">
            <span className="kpi-icon">💧</span>
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">{t('kpi_water_reserve')}</span>
            <h3>{stats.waterReserve}</h3>
            <div className="kpi-status-trend">
              <span className="lbl">{t('status_yaxshi')}</span>
              <span className="trend green-text">↑ {stats.waterReserveTrend}</span>
            </div>
          </div>
        </div>

        {/* Disease Risk */}
        <div className="farmer-kpi-card border-orange">
          <div className="kpi-icon-wrapper bg-orange-light">
            <span className="kpi-icon">🛡️</span>
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">{t('kpi_pest_risk')}</span>
            <h3>{stats.pestRisk}</h3>
            <div className="kpi-status-trend">
              <span className="lbl">{t('status_past')}</span>
              <span className="trend red-text">↓ {stats.pestRiskTrend}</span>
            </div>
          </div>
        </div>

        {/* Yield Forecast */}
        <div className="farmer-kpi-card border-purple">
          <div className="kpi-icon-wrapper bg-purple-light">
            <span className="kpi-icon">📈</span>
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">{t('kpi_yield_forecast')}</span>
            <h3>{stats.yieldForecast}</h3>
            <div className="kpi-status-trend">
              <span className="lbl">{t('status_yuqori')}</span>
              <span className="trend green-text">↑ {stats.yieldForecastTrend}</span>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="farmer-kpi-card border-teal">
          <div className="kpi-icon-wrapper bg-green-light">
            <span className="kpi-icon">💵</span>
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">{t('kpi_total_revenue')}</span>
            <h3>{stats.totalRevenue}</h3>
            <div className="kpi-status-trend">
              <span className="lbl">{t('status_bu_oy')}</span>
              <span className="trend green-text">↑ {stats.totalRevenueTrend}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Interactive Maps & AI Insights */}
      <div className="farmer-middle-grid">
        {/* Field Maps Container */}
        <div className="farmer-card map-card">
          <div className="card-header-row">
            <h3>{t('fields_map_title')}</h3>
            <div className="map-legend-controls">
              <div className="map-legends">
                <span className="legend-item"><i className="dot d-green"></i>{t('legend_excellent')}</span>
                <span className="legend-item"><i className="dot l-green"></i>{t('legend_good')}</span>
                <span className="legend-item"><i className="dot yellow"></i>{t('legend_average')}</span>
                <span className="legend-item"><i className="dot red"></i>{t('legend_poor')}</span>
              </div>
              <div className="map-filter-dropdown">
                <span>{t('all_fields')}</span>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          <div className="satellite-map-wrapper">
            <svg className="fields-vector-map" viewBox="0 0 540 280">
              <defs>
                <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="#1b2a1a" />
              <rect width="100%" height="100%" fill="url(#mapGrid)" />
              <circle cx="80" cy="90" r="120" fill="#233b22" opacity="0.4" filter="blur(20px)" />
              <circle cx="420" cy="200" r="150" fill="#2d4a2d" opacity="0.3" filter="blur(30px)" />
              
              {/* Fields polygons */}
              <polygon points="40,80 180,50 210,130 190,190 70,190" fill="rgba(21, 128, 61, 0.65)" stroke="#16a34a" strokeWidth="2" />
              <text x="120" y="120" fill="#ffffff" fontSize="12" fontWeight="700" textAnchor="middle">Paxta-1</text>
              <text x="120" y="136" fill="rgba(255, 255, 255, 0.8)" fontSize="10" textAnchor="middle">12.5 ga</text>
              
              <polygon points="190,50 280,30 330,110 220,130" fill="rgba(34, 197, 94, 0.55)" stroke="#4ade80" strokeWidth="2" />
              <text x="255" y="75" fill="#ffffff" fontSize="12" fontWeight="700" textAnchor="middle">G'alla-2</text>
              <text x="255" y="91" fill="rgba(255, 255, 255, 0.8)" fontSize="10" textAnchor="middle">8.3 ga</text>

              <polygon points="290,30 450,20 490,120 340,110" fill="rgba(234, 179, 8, 0.55)" stroke="#fde047" strokeWidth="2" />
              <text x="400" y="65" fill="#ffffff" fontSize="12" fontWeight="700" textAnchor="middle">Makkajo'xori-3</text>
              <text x="400" y="81" fill="rgba(255, 255, 255, 0.8)" fontSize="10" textAnchor="middle">15.7 ga</text>

              <polygon points="200,195 350,115 410,210 240,250" fill="rgba(34, 197, 94, 0.55)" stroke="#4ade80" strokeWidth="2" />
              <text x="300" y="175" fill="#ffffff" fontSize="12" fontWeight="700" textAnchor="middle">Paxta-5</text>
              <text x="300" y="191" fill="rgba(255, 255, 255, 0.8)" fontSize="10" textAnchor="middle">10.1 ga</text>

              <polygon points="350,115 490,120 520,200 420,210" fill="rgba(220, 38, 38, 0.6)" stroke="#f87171" strokeWidth="2" />
              <text x="450" y="160" fill="#ffffff" fontSize="12" fontWeight="700" textAnchor="middle">Sabzavot-4</text>
              <text x="450" y="176" fill="rgba(255, 255, 255, 0.8)" fontSize="10" textAnchor="middle">4.2 ga</text>

              <g transform="translate(16, 24)">
                <rect x="0" y="0" width="28" height="28" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.1)" />
                <text x="14" y="18" fill="#0f172a" fontSize="16" fontWeight="bold" textAnchor="middle">+</text>
                <rect x="0" y="34" width="28" height="28" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.1)" />
                <text x="14" y="52" fill="#0f172a" fontSize="16" fontWeight="bold" textAnchor="middle">-</text>
                <rect x="0" y="68" width="28" height="28" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.1)" />
                <text x="14" y="86" fill="#0f172a" fontSize="12" textAnchor="middle">⚙️</text>
                <rect x="0" y="102" width="28" height="28" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.1)" />
                <text x="14" y="120" fill="#0f172a" fontSize="12" textAnchor="middle">📍</text>
              </g>
            </svg>

            <div className="map-bottom-statistics">
              <div className="metric-box">
                <span>{t('jami_maydon')}</span>
                <strong>50.8 gektar</strong>
              </div>
              <div className="metric-box">
                <span>{t('crop_types')}</span>
                <strong>5 tur</strong>
              </div>
              <div className="metric-box">
                <span>{t('active_fields')}</span>
                <strong>5 ta</strong>
              </div>
              <button className="btn-fullscreen-map" onClick={() => setActiveTab('maps')}>
                <span>{t('open_full_map')}</span>
                <span className="icon">⤢</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Advice Card */}
        <div className="farmer-card ai-advice-card">
          <div className="card-header-row">
            <div className="title-beta-badge">
              <h3>{t('tab_ai')}</h3>
              <span className="badge-beta">Beta</span>
            </div>
          </div>

          <div className="ai-advisor-panel-body">
            <div className="ai-advisor-text-side">
              <h4>{t('ai_recom_title')}</h4>
              <p className="sub">{t('ai_recom_sub')}</p>

              <div className="advice-bullets-list">
                <div className="advice-bullet-item">
                  <div className="icon-circle bg-green-light">💧</div>
                  <div className="meta">
                    <strong>{t('ai_rec_1_title')}</strong>
                    <span>{t('ai_rec_1_desc')}</span>
                  </div>
                </div>

                <div className="advice-bullet-item">
                  <div className="icon-circle bg-green-light">🛡️</div>
                  <div className="meta">
                    <strong>{t('ai_rec_2_title')}</strong>
                    <span>{t('ai_rec_2_desc')}</span>
                  </div>
                </div>

                <div className="advice-bullet-item">
                  <div className="icon-circle bg-green-light">🌱</div>
                  <div className="meta">
                    <strong>{t('ai_rec_3_title')}</strong>
                    <span>{t('ai_rec_3_desc')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ai-robot-graphics-side">
              <div className="robot-floating-container">
                <div className="robot-glow-ring"></div>
                <div className="robot-sprout-mascot">
                  <svg className="smart-robot-mascot" viewBox="0 0 100 100" width="100" height="100">
                    <rect x="20" y="25" width="60" height="50" rx="20" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
                    <rect x="14" y="42" width="6" height="16" rx="3" fill="#cbd5e1" />
                    <rect x="80" y="42" width="6" height="16" rx="3" fill="#cbd5e1" />
                    <rect x="28" y="33" width="44" height="24" rx="10" fill="#0f172a" />
                    <ellipse cx="40" cy="45" rx="5" ry="3" fill="#22C55E" className="blinking-eye" />
                    <ellipse cx="60" cy="45" rx="5" ry="3" fill="#22C55E" className="blinking-eye" />
                    <line x1="50" y1="25" x2="50" y2="12" stroke="#cbd5e1" strokeWidth="3" />
                    <circle cx="50" cy="10" r="4" fill="#22C55E" />
                    <path d="M50,10 C55,5 62,5 62,12 C62,17 55,17 50,10" fill="#22C55E" />
                    <circle cx="34" cy="51" r="2.5" fill="#f87171" opacity="0.6" />
                    <circle cx="66" cy="51" r="2.5" fill="#f87171" opacity="0.6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <button className="btn-view-all-advices" onClick={() => setActiveTab('ai')}>
            <span>{t('view_all_advices')}</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>

      {/* Third Row: Analytics, Weather, Recent Activities */}
      <div className="farmer-bottom-three-columns">
        {/* Moisture level chart */}
        <div className="farmer-card moisture-chart-card">
          <div className="card-header-row">
            <h3>{t('moisture_level')}</h3>
            <div className="chart-mode-select">
              <span>{t('weekly')}</span>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          <div className="moisture-svg-wrapper">
            <svg className="moisture-line-chart" viewBox="0 0 380 160">
              <line x1="20" y1="120" x2="360" y2="120" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="20" y1="80" x2="360" y2="80" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="20" y1="40" x2="360" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <path 
                d="M 40 110 Q 90 120 140 85 T 190 75 T 240 80 T 290 40 T 340 50 L 340 140 L 40 140 Z" 
                fill="url(#moisture-area-grad)" 
                opacity="0.08"
              />
              <path 
                d="M 40 110 C 90 130, 90 70, 140 85 C 165 92, 165 72, 190 75 C 215 78, 215 82, 240 80 C 265 78, 265 38, 290 40 C 315 42, 315 48, 340 50" 
                fill="none" 
                stroke="#22C55E" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              {chartPoints.map((pt) => (
                <circle 
                  key={pt.day} 
                  cx={pt.x} 
                  cy={pt.y} 
                  r={activeChartPoint.day === pt.day ? "5" : "3.5"} 
                  fill={activeChartPoint.day === pt.day ? "#ffffff" : "#22C55E"} 
                  stroke="#22C55E" 
                  strokeWidth="3"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveChartPoint(pt)}
                />
              ))}
              {chartPoints.map((pt) => (
                <text key={pt.day} x={pt.x} y="152" fill="#94a3b8" fontSize="10.5" textAnchor="middle">{t(pt.day.toLowerCase()) || pt.day}</text>
              ))}
            </svg>

            <div className="chart-tooltip-floating" style={{ left: `${activeChartPoint.x - 30}px`, top: `${activeChartPoint.y - 45}px` }}>
              <span className="tip-date">{t(activeChartPoint.day.toLowerCase()) || activeChartPoint.day}</span>
              <span className="tip-value">{activeChartPoint.value}%</span>
            </div>
          </div>

          <div className="moisture-summary-row">
            <div className="summary-item">
              <span className="lbl">O'rtacha namlik</span>
              <strong className="val">65%</strong>
            </div>
            <div className="summary-item">
              <span className="lbl">Minimal</span>
              <strong className="val">42%</strong>
            </div>
            <div className="summary-item">
              <span className="lbl">Maksimal</span>
              <strong className="val">81%</strong>
            </div>
            <div className="summary-item">
              <span className="lbl">Trend</span>
              <strong className="val green-text">↑ 8.2%</strong>
            </div>
          </div>
        </div>

        {/* Weather widget */}
        <div className="farmer-card weather-forecast-card">
          <div className="card-header-row">
            <h3>{t('weather_forecast')}</h3>
            <div className="location-select">
              <span>{t('seven_days')}</span>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          <span className="weather-location-sub">{t('tashkent_uzb')}</span>

          <div className="weather-main-row">
            <div className="weather-degrees">
              <h2>28°C</h2>
              <span>{t('partly_cloudy')}</span>
            </div>
            <div className="weather-illustration-sun">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <circle cx="10" cy="10" r="4" fill="#eab308" stroke="#eab308" />
                <path d="M12 2v1.5M12 16.5v1.5M4.93 4.93l1.06 1.06M18.01 18.01l1.06 1.06M2 12h1.5M16.5 12h1.5M4.93 19.07l1.06-1.06M18.01 5.99l1.06-1.06" stroke="#eab308" />
                <path d="M18 18h-8.5A3.5 3.5 0 0 1 6 14.5A3.5 3.5 0 0 1 9.5 11c.2 0 .4 0 .6.1A4.5 4.5 0 0 1 18 12.5a3.5 3.5 0 0 1 0 5.5z" fill="#cbd5e1" stroke="#94a3b8" />
              </svg>
            </div>
          </div>

          <div className="weather-metrics-list">
            <div className="weather-metric">
              <span className="lbl">💧 {t('humidity')}</span>
              <strong>65%</strong>
            </div>
            <div className="weather-metric">
              <span className="lbl">💨 {t('wind')}</span>
              <strong>12 km/s</strong>
            </div>
            <div className="weather-metric">
              <span className="lbl">🌧️ {t('precipitation')}</span>
              <strong>10%</strong>
            </div>
          </div>

          <div className="weekly-forecast-list">
            <div className="day-forecast">
              <span className="lbl">{t('today')}</span>
              <span className="icon">⛅</span>
              <span className="temp">28°/18°</span>
            </div>
            <div className="day-forecast">
              <span className="lbl">{t('tuesday')}</span>
              <span className="icon">☀️</span>
              <span className="temp">30°/19°</span>
            </div>
            <div className="day-forecast">
              <span className="lbl">{t('wednesday')}</span>
              <span className="icon">☀️</span>
              <span className="temp">32°/20°</span>
            </div>
            <div className="day-forecast">
              <span className="lbl">{t('thursday')}</span>
              <span className="icon">⛅</span>
              <span className="temp">31°/21°</span>
            </div>
            <div className="day-forecast">
              <span className="lbl">{t('friday')}</span>
              <span className="icon">☁️</span>
              <span className="temp">29°/17°</span>
            </div>
            <div className="day-forecast">
              <span className="lbl">{t('saturday')}</span>
              <span className="icon">🌧️</span>
              <span className="temp">27°/16°</span>
            </div>
          </div>
        </div>

        {/* Recent activity timeline */}
        <div className="farmer-card activities-timeline-card">
          <div className="card-header-row">
            <h3>{t('recent_activities')}</h3>
            <span className="btn-view-all-activities" onClick={() => setActiveTab('notifications')}>{t('view_all')} →</span>
          </div>

          <div className="timeline-flow-list">
            <div className="timeline-item">
              <div className="timeline-icon-container bg-blue-light">💧</div>
              <div className="timeline-meta">
                <span className="msg">Sug'orish tizimi tekshirildi</span>
                <span className="desc">Paxta-1 maydonida</span>
                <span className="time">2 soat oldin</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon-container bg-green-light">🧠</div>
              <div className="timeline-meta">
                <span className="msg">AI tavsiya yangilandi</span>
                <span className="desc">Yangi tavsiyalar tayyor</span>
                <span className="time">4 soat oldin</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon-container bg-green-light">👁️</div>
              <div className="timeline-meta">
                <span className="msg">Kasallik skaneri bajarildi</span>
                <span className="desc">Barcha maydonlar tekshirildi</span>
                <span className="time">6 soat oldin</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon-container bg-orange-light">📅</div>
              <div className="timeline-meta">
                <span className="msg">O'g'itlash rejalashtirildi</span>
                <span className="desc">Makkajo'xori-3 maydoni uchun</span>
                <span className="time">1 kun oldin</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon-container bg-green-light">📊</div>
              <div className="timeline-meta">
                <span className="msg">Hosildorlik prognozi yangilandi</span>
                <span className="desc">2024 mavsumi uchun</span>
                <span className="time">1 kun oldin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
