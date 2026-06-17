import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fullName, setFullName] = useState(user?.fullName || 'Asror');
  const [email, setEmail] = useState(user?.email || 'asroradmin@gmail.com');
  const [language, setLanguage] = useState('Uzbek');

  // Farm CRUD state
  const [farms, setFarms] = useState([
    { id: 1, name: 'Sergeli Paxta Maydoni', location: 'Sergeli, Toshkent', size: '12.4 ga', owner: 'Asror Fayzullayev', description: 'G\'o\'za yetishtirish maydoni', status: 'Active' },
    { id: 2, name: 'Chinoz Issiqxonasi', location: 'Chinoz, Toshkent viloyati', size: '2.5 ga', owner: 'Asror Fayzullayev', description: 'Pomidor va bodring issiqxonasi', status: 'Active' },
    { id: 3, name: 'Qibray Olmazori', location: 'Qibray, Toshkent', size: '8.0 ga', owner: 'Dilshod Umarov', description: 'Intensiv olma bog\'i', status: 'Pending' }
  ]);
  const [farmForm, setFarmForm] = useState({ name: '', location: '', size: '', owner: 'Asror Fayzullayev', description: '', status: 'Active' });
  const [editingFarmId, setEditingFarmId] = useState(null);
  const [showFarmModal, setShowFarmModal] = useState(false);

  // Task CRUD state
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Soil Moisture Check - Field B', assignedTo: 'John Doe', status: 'Pending', priority: 'High', deadline: '2026-06-17', time: '08:00 AM' },
    { id: 2, title: 'AI Pest Forecast Review', assignedTo: 'Asror Fayzullayev', status: 'In Progress', priority: 'Medium', deadline: '2026-06-17', time: '11:00 AM' },
    { id: 3, title: 'Planting Field C', assignedTo: 'Sarah Jenkins', status: 'Pending', priority: 'High', deadline: '2026-06-18', time: '09:00 AM' },
    { id: 4, title: 'Irrigation scheduled for Field A', assignedTo: 'Worker Node', status: 'Completed', priority: 'Low', deadline: '2026-06-16', time: '04:00 PM' }
  ]);
  const [taskForm, setTaskForm] = useState({ title: '', assignedTo: '', status: 'Pending', priority: 'Medium', deadline: '', time: '09:00 AM' });
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Calendar state
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(17);
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Search filter
  const filteredFarms = farms.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Farm Overview Tooltip state
  const [activeChartPoint, setActiveChartPoint] = useState({ day: 21, score: 78, x: 260, y: 75 });
  const chartPoints = [
    { day: 1, score: 32, x: 20, y: 130 },
    { day: 7, score: 48, x: 100, y: 110 },
    { day: 14, score: 55, x: 180, y: 95 },
    { day: 21, score: 78, x: 260, y: 65 },
    { day: 28, score: 62, x: 340, y: 85 },
    { day: 31, score: 92, x: 420, y: 40 }
  ];

  // Weather active tab state
  const [weatherCity, setWeatherCity] = useState('Tashkent');

  // Farm actions handler
  const handleAddOrEditFarm = (e) => {
    e.preventDefault();
    if (editingFarmId) {
      setFarms(farms.map(f => f.id === editingFarmId ? { ...f, ...farmForm } : f));
      setEditingFarmId(null);
    } else {
      setFarms([...farms, { ...farmForm, id: Date.now() }]);
    }
    setFarmForm({ name: '', location: '', size: '', owner: 'Asror Fayzullayev', description: '', status: 'Active' });
    setShowFarmModal(false);
  };

  const handleEditFarmClick = (farm) => {
    setFarmForm(farm);
    setEditingFarmId(farm.id);
    setShowFarmModal(true);
  };

  const handleDeleteFarm = (id) => {
    if (window.confirm("Haqiqatan ham ushbu maydonni o'chirmoqchimisiz?")) {
      setFarms(farms.filter(f => f.id !== id));
    }
  };

  // Task actions handler
  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...taskForm, id: Date.now() }]);
    setTaskForm({ title: '', assignedTo: '', status: 'Pending', priority: 'Medium', deadline: '', time: '09:00 AM' });
    setShowTaskModal(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="admin-light-dashboard">
      
      {/* Sidebar Navigation */}
      <aside className={`light-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="light-sidebar-brand">
          <div className="light-logo-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 8.5C17 15 15 18 11 20z"></path>
              <path d="M19 2c-2.26 4.33-5.27 7.14-8 10"></path>
            </svg>
          </div>
          <span className="light-brand-text">AgroMind AI</span>
          <button className="sidebar-close-btn" onClick={() => setMobileMenuOpen(false)}>×</button>
        </div>

        <nav className="light-sidebar-menu">
          <button 
            className={`light-sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
          >
            <span className="light-menu-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </span> 
            Dashboard
          </button>
          
          <button 
            className={`light-sidebar-link ${activeTab === 'farms' ? 'active' : ''}`}
            onClick={() => { setActiveTab('farms'); setMobileMenuOpen(false); }}
          >
            <span className="light-menu-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </span>
            Farm Management
          </button>

          <button 
            className={`light-sidebar-link ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => { setActiveTab('tasks'); setMobileMenuOpen(false); }}
          >
            <span className="light-menu-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </span>
            Task Manager
          </button>

          <button 
            className={`light-sidebar-link ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => { setActiveTab('calendar'); setMobileMenuOpen(false); }}
          >
            <span className="light-menu-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </span>
            Agro-Calendar
          </button>

          <button 
            className={`light-sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }}
          >
            <span className="light-menu-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </span>
            Statistics & AI
          </button>

          <button 
            className={`light-sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
          >
            <span className="light-menu-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </span>
            Settings
          </button>

          <button 
            className="light-sidebar-link admin-logout-btn"
            onClick={() => { if (window.confirm("Tizimdan chiqmoqchimisiz?")) logout(); }}
            style={{ color: '#ef4444', marginTop: '12px' }}
          >
            <span className="light-menu-icon" style={{ color: '#ef4444' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </span>
            Chiqish (Logout)
          </button>
        </nav>

        {/* Upgrade Card Promotion */}
        <div className="light-upgrade-card">
          <div className="upgrade-sprout-icon">🌱</div>
          <h4>Upgrade to Pro</h4>
          <p>Unlock advanced AI insights and more features.</p>
          <button className="upgrade-action-btn">Upgrade Now</button>
        </div>

        {/* Profile details at bottom */}
        <div className="light-sidebar-profile">
          <div className="profile-img-container">
            <span className="profile-letters">{fullName.charAt(0).toUpperCase()}</span>
          </div>
          <div className="profile-meta">
            <h5>{fullName} Fayzullayev</h5>
            <span className="font-muted">Super Admin</span>
          </div>
          <svg className="chevron-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </aside>

      {/* Main Container Area */}
      <div className="light-main-container">
        
        {/* Top Navbar */}
        <header className="light-navbar">
          <button className="sidebar-open-btn" onClick={() => setMobileMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Welcome greetings (Dashboard specific or generic) */}
          <div className="light-navbar-greetings">
            <h1>Good morning, {fullName}! 🍃</h1>
            <p>Here's what's happening on your farm today.</p>
          </div>

          <div className="light-navbar-actions">
            
            {/* Global Search */}
            <div className="light-navbar-search">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Search anything... ⌘K" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Notification triggers */}
            <div className="navbar-badge-btn" onClick={() => setNotificationOpen(!notificationOpen)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="badge-count">3</span>
              {notificationOpen && (
                <div className="notification-dropdown-box">
                  <div className="drop-header">Notifications</div>
                  <div className="drop-item"><strong>Soil moisture check</strong> completed in Field B</div>
                  <div className="drop-item"><strong>Pest alert</strong> warning in Chinoz Greenhouse</div>
                  <div className="drop-item">New irrigation schedule recommended</div>
                </div>
              )}
            </div>

            {/* Night mode toggle */}
            <button className="navbar-theme-btn" aria-label="Toggle theme">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>

            {/* Profile badge */}
            <div className="navbar-user-info">
              <div className="navbar-user-avatar">
                {fullName.charAt(0).toUpperCase()}
              </div>
              <div className="navbar-user-text">
                <span className="user-name">{fullName} Fayzullayev</span>
                <span className="user-role">Super Admin</span>
              </div>
            </div>

          </div>
        </header>

        {/* Dynamic page content based on tab selection */}
        <div className="light-page-content">
          
          {activeTab === 'dashboard' && (
            <>
              {/* Row filters */}
              <div className="dashboard-filter-row">
                <div className="filter-dropdown-trigger">
                  <span>All Farms</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div className="filter-dropdown-trigger">
                  <span>This Month</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              {/* KPI Cards Row */}
              <div className="light-kpi-grid">
                
                {/* Total Farms */}
                <div className="light-kpi-card hover-lift">
                  <div className="kpi-icon-wrapper bg-green-light">
                    <span className="kpi-icon">🌾</span>
                  </div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Total Farms</span>
                    <h3>24</h3>
                    <div className="kpi-trend trend-up">
                      <span>↑ 12%</span> vs last month
                    </div>
                  </div>
                </div>

                {/* Total Crops */}
                <div className="light-kpi-card hover-lift">
                  <div className="kpi-icon-wrapper bg-green-light">
                    <span className="kpi-icon">🌱</span>
                  </div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Total Crops</span>
                    <h3>56</h3>
                    <div className="kpi-trend trend-up">
                      <span>↑ 8%</span> vs last month
                    </div>
                  </div>
                </div>

                {/* Active Tasks */}
                <div className="light-kpi-card hover-lift">
                  <div className="kpi-icon-wrapper bg-blue-light">
                    <span className="kpi-icon">📋</span>
                  </div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Active Tasks</span>
                    <h3>18</h3>
                    <div className="kpi-trend trend-down">
                      <span>↓ 5%</span> vs last month
                    </div>
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="light-kpi-card hover-lift">
                  <div className="kpi-icon-wrapper bg-orange-light">
                    <span className="kpi-icon">💰</span>
                  </div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Total Revenue</span>
                    <h3>$72,540</h3>
                    <div className="kpi-trend trend-up">
                      <span>↑ 15%</span> vs last month
                    </div>
                  </div>
                </div>

                {/* AI Accuracy */}
                <div className="light-kpi-card hover-lift">
                  <div className="kpi-icon-wrapper bg-purple-light">
                    <span className="kpi-icon">🧠</span>
                  </div>
                  <div className="kpi-meta">
                    <span className="kpi-label">AI Accuracy</span>
                    <h3>94.7%</h3>
                    <div className="kpi-trend trend-up">
                      <span>↑ 2.4%</span> vs last month
                    </div>
                  </div>
                </div>

              </div>

              {/* Second Row: Graphs & Weather */}
              <div className="dashboard-charts-grid">
                
                {/* Farm Overview Line Graph */}
                <div className="light-card chart-card flex-double">
                  <div className="card-header-row">
                    <h3>Farm Overview</h3>
                    <div className="chart-filter">
                      <span>This Month</span>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>

                  {/* SVG line graph */}
                  <div className="svg-chart-container">
                    <svg className="overview-line-chart" viewBox="0 0 460 180">
                      {/* Grid lines */}
                      <line x1="20" y1="130" x2="440" y2="130" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="20" y1="90" x2="440" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="20" y1="50" x2="440" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                      
                      {/* Smooth Area Gradient */}
                      <path 
                        d="M 20 130 L 20 130 L 100 110 L 180 95 L 260 65 L 340 85 L 420 40 L 420 160 L 20 160 Z" 
                        fill="url(#chart-area-grad)" 
                        opacity="0.1"
                      />
                      <defs>
                        <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22C55E" />
                          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Line connection path */}
                      <path 
                        d="M 20 130 L 100 110 L 180 95 L 260 65 L 340 85 L 420 40" 
                        fill="none" 
                        stroke="#22C55E" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Highlighted dots */}
                      {chartPoints.map((pt) => (
                        <circle 
                          key={pt.day} 
                          cx={pt.x} 
                          cy={pt.y} 
                          r={activeChartPoint.day === pt.day ? "6" : "4"} 
                          fill={activeChartPoint.day === pt.day ? "#ffffff" : "#22C55E"} 
                          stroke="#22C55E" 
                          strokeWidth="3.5"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setActiveChartPoint(pt)}
                        />
                      ))}

                      {/* X Axis Labels */}
                      <text x="20" y="172" fill="#94a3b8" fontSize="11" textAnchor="middle">May 1</text>
                      <text x="100" y="172" fill="#94a3b8" fontSize="11" textAnchor="middle">May 7</text>
                      <text x="180" y="172" fill="#94a3b8" fontSize="11" textAnchor="middle">May 14</text>
                      <text x="260" y="172" fill="#94a3b8" fontSize="11" textAnchor="middle">May 21</text>
                      <text x="340" y="172" fill="#94a3b8" fontSize="11" textAnchor="middle">May 28</text>
                      <text x="420" y="172" fill="#94a3b8" fontSize="11" textAnchor="middle">May 31</text>
                    </svg>

                    {/* Chart Floating Tooltip */}
                    <div className="chart-tooltip-floating" style={{ left: `${activeChartPoint.x - 30}px`, top: `${activeChartPoint.y - 45}px` }}>
                      <span className="tip-date">May {activeChartPoint.day}</span>
                      <span className="tip-value">Farm Score: {activeChartPoint.score}%</span>
                    </div>
                  </div>

                  {/* Under chart progress values */}
                  <div className="chart-progress-indicators">
                    <div className="progress-item">
                      <div className="progress-meta">
                        <span className="progress-label">Soil Health</span>
                        <strong className="progress-value">85%</strong>
                      </div>
                      <div className="progress-bar-bg"><div className="progress-bar-fill bg-green" style={{ width: '85%' }}></div></div>
                    </div>
                    <div className="progress-item">
                      <div className="progress-meta">
                        <span className="progress-label">Water Management</span>
                        <strong className="progress-value">78%</strong>
                      </div>
                      <div className="progress-bar-bg"><div className="progress-bar-fill bg-blue" style={{ width: '78%' }}></div></div>
                    </div>
                    <div className="progress-item">
                      <div className="progress-meta">
                        <span className="progress-label">Pest Control</span>
                        <strong className="progress-value">88%</strong>
                      </div>
                      <div className="progress-bar-bg"><div className="progress-bar-fill bg-purple" style={{ width: '88%' }}></div></div>
                    </div>
                    <div className="progress-item">
                      <div className="progress-meta">
                        <span className="progress-label">Fertilization</span>
                        <strong className="progress-value">75%</strong>
                      </div>
                      <div className="progress-bar-bg"><div className="progress-bar-fill bg-orange" style={{ width: '75%' }}></div></div>
                    </div>
                  </div>
                </div>

                {/* Crop Status Donut Chart */}
                <div className="light-card chart-card">
                  <div className="card-header-row">
                    <h3>Crop Status</h3>
                  </div>

                  <div className="donut-chart-flex">
                    <div className="donut-svg-wrapper">
                      <svg viewBox="0 0 100 100" width="120" height="120">
                        {/* Planned: 6 (10%) - Blue */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="10" strokeDasharray="10 100" strokeDashoffset="25" />
                        {/* Need Attention: 10 (18%) - Red */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="10" strokeDasharray="18 100" strokeDashoffset="15" />
                        {/* At Risk: 16 (29%) - Orange */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="10" strokeDasharray="29 100" strokeDashoffset="-3" />
                        {/* Healthy: 24 (43%) - Green */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22C55E" strokeWidth="10" strokeDasharray="43 100" strokeDashoffset="-32" />
                      </svg>
                      <div className="donut-center-info">
                        <span className="donut-num">56</span>
                        <span className="donut-lbl">Total Crops</span>
                      </div>
                    </div>

                    <div className="donut-legends-list">
                      <div className="legend-row">
                        <span className="legend-dot bg-green"></span>
                        <div className="legend-info">
                          <span className="lbl">Healthy</span>
                          <span className="val">24 (43%)</span>
                        </div>
                      </div>
                      <div className="legend-row">
                        <span className="legend-dot bg-orange"></span>
                        <div className="legend-info">
                          <span className="lbl">At Risk</span>
                          <span className="val">16 (29%)</span>
                        </div>
                      </div>
                      <div className="legend-row">
                        <span className="legend-dot bg-red"></span>
                        <div className="legend-info">
                          <span className="lbl">Need Attention</span>
                          <span className="val">10 (18%)</span>
                        </div>
                      </div>
                      <div className="legend-row">
                        <span className="legend-dot bg-blue"></span>
                        <div className="legend-info">
                          <span className="lbl">Planned</span>
                          <span className="val">6 (10%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="donut-footer-btn" onClick={() => setActiveTab('farms')}>View Details →</button>
                </div>

                {/* Weather Forecast widget */}
                <div className="light-card weather-card">
                  <div className="card-header-row">
                    <h3>Weather Forecast</h3>
                    <span className="weather-location">Tashkent, Uzbekistan</span>
                  </div>

                  <div className="weather-main-row">
                    <div className="weather-degrees">
                      <h2>28°C</h2>
                      <span>Partly Cloudy</span>
                    </div>
                    <div className="weather-illustration-sun">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2">
                        <circle cx="12" cy="12" r="5" fill="#fef08a" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                    </div>
                  </div>

                  <div className="weather-metrics-list">
                    <div className="weather-metric">
                      <span className="lbl">💧 Humidity</span>
                      <strong>65%</strong>
                    </div>
                    <div className="weather-metric">
                      <span className="lbl">💨 Wind</span>
                      <strong>18 km/h</strong>
                    </div>
                    <div className="weather-metric">
                      <span className="lbl">🌧 Rain</span>
                      <strong>10%</strong>
                    </div>
                  </div>

                  <div className="weekly-forecast-list">
                    <div className="day-forecast">
                      <span className="lbl">Mon</span>
                      <span className="icon">⛅</span>
                      <span className="temp">28°/18°</span>
                    </div>
                    <div className="day-forecast">
                      <span className="lbl">Tue</span>
                      <span className="icon">☀️</span>
                      <span className="temp">30°/19°</span>
                    </div>
                    <div className="day-forecast">
                      <span className="lbl">Wed</span>
                      <span className="icon">☀️</span>
                      <span className="temp">32°/20°</span>
                    </div>
                    <div className="day-forecast">
                      <span className="lbl">Thu</span>
                      <span className="icon">⛅</span>
                      <span className="temp">31°/21°</span>
                    </div>
                    <div className="day-forecast">
                      <span className="lbl">Fri</span>
                      <span className="icon">🌧</span>
                      <span className="temp">29°/17°</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Third Row: Timeline, AI insight, Tasks calendar */}
              <div className="dashboard-grid-three-columns">
                
                {/* Recent Activities */}
                <div className="light-card timeline-card">
                  <div className="card-header-row">
                    <h3>Recent Activities</h3>
                  </div>

                  <div className="timeline-flow-list">
                    <div className="timeline-item">
                      <div className="timeline-icon-container bg-green-light">💧</div>
                      <div className="timeline-meta">
                        <span className="msg">Soil moisture check completed in Field B</span>
                        <span className="time">2 minutes ago</span>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-icon-container bg-orange-light">⚠️</div>
                      <div className="timeline-meta">
                        <span className="msg">AI pest detection alert in Field C</span>
                        <span className="time">15 minutes ago</span>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-icon-container bg-blue-light">⚙️</div>
                      <div className="timeline-meta">
                        <span className="msg">Irrigation scheduled for Field A</span>
                        <span className="time">1 hour ago</span>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-icon-container bg-green-light">📄</div>
                      <div className="timeline-meta">
                        <span className="msg">Crop health report generated</span>
                        <span className="time">2 hours ago</span>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-icon-container bg-purple-light">👤</div>
                      <div className="timeline-meta">
                        <span className="msg">New task assigned to John Doe</span>
                        <span className="time">3 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights Card */}
                <div className="light-card ai-insight-card">
                  <div className="card-header-row">
                    <h3>AI Insights</h3>
                  </div>
                  <p className="ai-insight-desc">Smart recommendations for your farm</p>

                  <div className="ai-overall-score-panel">
                    <h2>85%</h2>
                    <span>Overall Farm Score</span>
                  </div>

                  <div className="ai-plant-animation-wrapper">
                    {/* Leaf connection graphic nodes */}
                    <div className="leaf-sprout-graphic">🌱</div>
                    <div className="glowing-node node-1"></div>
                    <div className="glowing-node node-2"></div>
                    <div className="glowing-node node-3"></div>
                  </div>

                  <button className="ai-view-btn" onClick={() => setActiveTab('analytics')}>View Insights →</button>
                </div>

                {/* Agro-Calendar & Tasks planner */}
                <div className="light-card calendar-tasks-card">
                  <div className="card-header-row">
                    <h3>Agro-Calendar & Tasks</h3>
                    <button className="btn-view-all-cal" onClick={() => setActiveTab('calendar')}>View Calendar</button>
                  </div>

                  <div className="mini-calendar-flex">
                    {/* Mini Calendar May 24 */}
                    <div className="mini-calendar-grid">
                      <div className="cal-header-row">
                        <span>‹</span>
                        <strong>May 2024</strong>
                        <span>›</span>
                      </div>
                      <div className="cal-days-grid">
                        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                        {/* Row placeholders */}
                        <span className="disabled">28</span><span className="disabled">29</span><span className="disabled">30</span><span>1</span><span>2</span><span>3</span><span>4</span>
                        <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
                        <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span className="cal-active-day">17</span><span>18</span>
                        <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                        <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span className="disabled">1</span>
                      </div>
                    </div>

                    {/* Short tasks list */}
                    <div className="cal-quick-tasks">
                      <div className="quick-task-item">
                        <span className="status-dot dot-green"></span>
                        <div className="meta">
                          <h6>Soil Moisture Check - Field B</h6>
                          <span>Today, 08:00 AM</span>
                        </div>
                      </div>
                      <div className="quick-task-item">
                        <span className="status-dot dot-orange"></span>
                        <div className="meta">
                          <h6>AI Pest Forecast Review</h6>
                          <span>Today, 11:00 AM</span>
                        </div>
                      </div>
                      <div className="quick-task-item">
                        <span className="status-dot dot-blue"></span>
                        <div className="meta">
                          <h6>Planting Field C</h6>
                          <span>Tomorrow, 09:00 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="add-task-full-btn" onClick={() => setShowTaskModal(true)}>+ Add New Task</button>
                </div>

              </div>
            </>
          )}

          {/* Tab 2: Farm Management CRUD Panel */}
          {activeTab === 'farms' && (
            <div className="crud-section-view">
              <div className="section-header-row">
                <div>
                  <h2>Farm Management</h2>
                  <p className="subtitle">Register, monitor and manage agricultural lands and farm parameters.</p>
                </div>
                <button className="btn-add-farm-premium" onClick={() => { setEditingFarmId(null); setFarmForm({ name: '', location: '', size: '', owner: 'Asror Fayzullayev', description: '', status: 'Active' }); setShowFarmModal(true); }}>
                  + Add New Farm
                </button>
              </div>

              {/* CRUD list grid card */}
              <div className="light-card crud-card-wrapper">
                <div className="table-search-bar">
                  <input 
                    type="text" 
                    placeholder="Search farms by name or location..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="responsive-table-holder">
                  <table className="light-dashboard-table">
                    <thead>
                      <tr>
                        <th>Farm Name</th>
                        <th>Location</th>
                        <th>Size (hectares)</th>
                        <th>Owner</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFarms.length === 0 ? (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No farms found matching your search.</td>
                        </tr>
                      ) : (
                        filteredFarms.map((farm) => (
                          <tr key={farm.id}>
                            <td>
                              <div className="farm-name-td">
                                <span className="farm-icon">🌾</span>
                                <div>
                                  <strong>{farm.name}</strong>
                                  <span className="desc-sub">{farm.description}</span>
                                </div>
                              </div>
                            </td>
                            <td>{farm.location}</td>
                            <td>{farm.size}</td>
                            <td>{farm.owner}</td>
                            <td>
                              <span className={`status-badge-premium ${farm.status.toLowerCase()}`}>
                                {farm.status}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <button className="btn-table-action btn-edit" onClick={() => handleEditFarmClick(farm)}>Edit</button>
                              <button className="btn-table-action btn-delete" onClick={() => handleDeleteFarm(farm.id)}>Delete</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Task Manager CRUD Panel */}
          {activeTab === 'tasks' && (
            <div className="crud-section-view">
              <div className="section-header-row">
                <div>
                  <h2>Task Manager</h2>
                  <p className="subtitle">Assign and monitor daily farm duties, task progress, and priorities.</p>
                </div>
                <button className="btn-add-farm-premium" onClick={() => { setShowTaskModal(true); }}>
                  + Add New Task
                </button>
              </div>

              <div className="light-card crud-card-wrapper">
                <div className="responsive-table-holder">
                  <table className="light-dashboard-table">
                    <thead>
                      <tr>
                        <th>Task Details</th>
                        <th>Assigned Worker</th>
                        <th>Deadline</th>
                        <th>Time</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((t) => (
                        <tr key={t.id}>
                          <td><strong>{t.title}</strong></td>
                          <td>{t.assignedTo}</td>
                          <td>{t.deadline}</td>
                          <td>{t.time}</td>
                          <td>
                            <span className={`priority-badge ${t.priority.toLowerCase()}`}>
                              {t.priority}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge-premium ${t.status.toLowerCase().replace(' ', '-')}`}>
                              {t.status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button className="btn-table-action btn-delete" onClick={() => handleDeleteTask(t.id)}>Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Agro-Calendar full View */}
          {activeTab === 'calendar' && (
            <div className="crud-section-view">
              <h2>Agro-Calendar</h2>
              <p className="subtitle" style={{ marginBottom: '24px' }}>Monthly overview of crop harvests, watering cycles and worker schedules.</p>
              
              <div className="light-card full-calendar-card">
                <div className="full-calendar-header">
                  <h3>May 2024</h3>
                  <div className="calendar-modes">
                    <button className="active">Month</button>
                    <button>Week</button>
                    <button>Day</button>
                  </div>
                </div>

                <div className="full-calendar-grid-header">
                  <span>Sunday</span><span>Monday</span><span>Tuesday</span><span>Wednesday</span><span>Thursday</span><span>Friday</span><span>Saturday</span>
                </div>
                
                <div className="full-calendar-days">
                  {calendarDays.map((day) => {
                    const dayTasks = tasks.filter(t => t.deadline.endsWith(`-${day < 10 ? '0' + day : day}`));
                    return (
                      <div key={day} className={`calendar-day-cell ${day === selectedCalendarDate ? 'selected' : ''}`} onClick={() => setSelectedCalendarDate(day)}>
                        <span className="day-number">{day}</span>
                        <div className="day-events-list">
                          {dayTasks.map(t => (
                            <span key={t.id} className={`day-event-pill ${t.priority.toLowerCase()}`}>{t.title}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Statistics & AI View */}
          {activeTab === 'analytics' && (
            <div className="crud-section-view">
              <h2>Statistics & AI</h2>
              <p className="subtitle" style={{ marginBottom: '24px' }}>AI Predictive metrics, water usage telemetry and expected revenue estimations.</p>

              <div className="analytics-dashboard-grid">
                
                {/* Crop Yield Performance */}
                <div className="light-card analytics-box-card">
                  <h4>Crop Performance Analytics</h4>
                  <p className="box-desc">NDVI vegetation levels and crop health growth rate over time</p>
                  
                  <div className="crop-metric-row">
                    <span>Cotton (Paxta)</span>
                    <strong>94% Excellent</strong>
                  </div>
                  <div className="bar-graph-fill-container"><div className="bar-graph-fill bg-green" style={{ width: '94%' }}></div></div>

                  <div className="crop-metric-row" style={{ marginTop: '16px' }}>
                    <span>Wheat (Bug'doy)</span>
                    <strong>82% Good</strong>
                  </div>
                  <div className="bar-graph-fill-container"><div className="bar-graph-fill bg-green" style={{ width: '82%' }}></div></div>

                  <div className="crop-metric-row" style={{ marginTop: '16px' }}>
                    <span>Vegetables (Chinoz Greenhouse)</span>
                    <strong>68% Moderate</strong>
                  </div>
                  <div className="bar-graph-fill-container"><div className="bar-graph-fill bg-orange" style={{ width: '68%' }}></div></div>
                </div>

                {/* AI Resource Optimization */}
                <div className="light-card analytics-box-card">
                  <h4>Water Optimization (AI Recommendation)</h4>
                  <p className="box-desc">Automated sensor diagnostics and watering schedule plans</p>
                  
                  <div className="water-telemetry-metrics">
                    <div className="water-metric-box">
                      <span>Target Moisture</span>
                      <strong>70%</strong>
                    </div>
                    <div className="water-metric-box">
                      <span>Watering Rate</span>
                      <strong>1.2L / day</strong>
                    </div>
                  </div>

                  <div className="alert-box-info" style={{ marginTop: '16px' }}>
                    💡 <strong>AI Recommendation:</strong> Reduce Sergeli watering cycle by 15% tonight due to predicted rainfall tomorrow.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 6: Settings panel */}
          {activeTab === 'settings' && (
            <div className="crud-section-view">
              <h2>Settings & Customization</h2>
              <p className="subtitle" style={{ marginBottom: '24px' }}>Modify admin configurations, user information and system parameters.</p>

              <div className="light-card settings-card-content">
                <form className="settings-light-form" onSubmit={(e) => { e.preventDefault(); alert("Sozlamalar saqlandi!"); }}>
                  <div className="form-input-pair">
                    <label>Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div className="form-input-pair" style={{ marginTop: '16px' }}>
                    <label>Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-input-pair" style={{ marginTop: '16px' }}>
                    <label>Default Language</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <option value="Uzbek">Uzbek</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-add-farm-premium" style={{ marginTop: '24px', width: '100%' }}>Save Profile</button>
                </form>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <footer className="light-dashboard-footer">
          <span>© 2024 AgroMind AI. All rights reserved.</span>
        </footer>

      </div>

      {/* Farm CRUD Modal */}
      {showFarmModal && (
        <div className="light-modal-overlay">
          <div className="light-modal-box">
            <div className="modal-header">
              <h3>{editingFarmId ? 'Edit Farm' : 'Add New Farm'}</h3>
              <button className="close-modal-btn" onClick={() => setShowFarmModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddOrEditFarm} className="modal-form-fields">
              <div className="modal-input-field">
                <label>Farm Name</label>
                <input 
                  type="text" 
                  value={farmForm.name} 
                  onChange={(e) => setFarmForm({ ...farmForm, name: e.target.value })} 
                  placeholder="e.g. Sergeli cotton fields" 
                  required 
                />
              </div>
              <div className="modal-input-field">
                <label>Location</label>
                <input 
                  type="text" 
                  value={farmForm.location} 
                  onChange={(e) => setFarmForm({ ...farmForm, location: e.target.value })} 
                  placeholder="e.g. Sergeli, Toshkent" 
                  required 
                />
              </div>
              <div className="modal-input-field">
                <label>Size (hectares)</label>
                <input 
                  type="text" 
                  value={farmForm.size} 
                  onChange={(e) => setFarmForm({ ...farmForm, size: e.target.value })} 
                  placeholder="e.g. 15 ga" 
                  required 
                />
              </div>
              <div className="modal-input-field">
                <label>Status</label>
                <select value={farmForm.status} onChange={(e) => setFarmForm({ ...farmForm, status: e.target.value })}>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-input-field">
                <label>Description</label>
                <textarea 
                  value={farmForm.description} 
                  onChange={(e) => setFarmForm({ ...farmForm, description: e.target.value })} 
                  placeholder="Tell something about this farm..." 
                />
              </div>
              <div className="modal-actions-row">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowFarmModal(false)}>Cancel</button>
                <button type="submit" className="btn-modal-submit">{editingFarmId ? 'Save changes' : 'Create Farm'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task CRUD Modal */}
      {showTaskModal && (
        <div className="light-modal-overlay">
          <div className="light-modal-box">
            <div className="modal-header">
              <h3>Create New Duty / Task</h3>
              <button className="close-modal-btn" onClick={() => setShowTaskModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddTask} className="modal-form-fields">
              <div className="modal-input-field">
                <label>Task Title</label>
                <input 
                  type="text" 
                  value={taskForm.title} 
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} 
                  placeholder="e.g. Watering Field A" 
                  required 
                />
              </div>
              <div className="modal-input-field">
                <label>Assignee</label>
                <input 
                  type="text" 
                  value={taskForm.assignedTo} 
                  onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })} 
                  placeholder="e.g. John Doe" 
                  required 
                />
              </div>
              <div className="modal-input-field">
                <label>Deadline Date</label>
                <input 
                  type="date" 
                  value={taskForm.deadline} 
                  onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })} 
                  required 
                />
              </div>
              <div className="modal-input-field">
                <label>Priority</label>
                <select value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="modal-actions-row">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowTaskModal(false)}>Cancel</button>
                <button type="submit" className="btn-modal-submit">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}


