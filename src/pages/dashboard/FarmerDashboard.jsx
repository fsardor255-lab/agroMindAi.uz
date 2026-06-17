import { useState, useEffect, useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

// Context imports
import { LanguageContext } from '../../context/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Grid, Leaf, MapPin, Droplet, Camera, BarChart2, Brain, Bell, Mail, Settings, Search, Calendar, RefreshCcw, Sun, Globe, Plus, LogOut } from 'lucide-react';


// Tab component imports
import DashboardTab from './tabs/DashboardTab';
import CropsTab from './tabs/CropsTab';
import MapsTab from './tabs/MapsTab';
import IrrigationTab from './tabs/IrrigationTab';
import ScannerTab from './tabs/ScannerTab';
import ReportsTab from './tabs/ReportsTab';
import AiTab from './tabs/AiTab';
import NotificationsTab from './tabs/NotificationsTab';
import SettingsTab from './tabs/SettingsTab';

export default function FarmerDashboard() {
  const { user, logout } = useAuth();
  const { t, currentLanguage, changeLanguage } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickActionModal, setShowQuickActionModal] = useState(false);

  // Language selection dropdown toggle
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Profile dropdown toggle
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // AI Advisor state
  const [question, setQuestion] = useState('');
  const [aiChat, setAiChat] = useState([
    { sender: 'ai', text: "Salom! AgroMind AI yordamchisiga xush kelibsiz. Ekinlaringiz, sug'orish rejasi yoki o'g'itlash bo'yicha savollaringiz bo'lsa, yozib qoldiring." }
  ]);
  const [asking, setAsking] = useState(false);

  // Disease scanner file upload simulation
  const [uploadedImage, setUploadedImage] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  // Mock initial dashboard statistics matching screenshot
  const [stats, setStats] = useState({
    cropHealth: '94%',
    cropHealthStatus: 'Juda yaxshi',
    cropHealthTrend: '+ 3.2%',
    waterReserve: '82%',
    waterReserveStatus: 'Yaxshi',
    waterReserveTrend: '+ 4.1%',
    pestRisk: '12%',
    pestRiskStatus: 'Past',
    pestRiskTrend: '- 2.3%',
    yieldForecast: '86%',
    yieldForecastStatus: 'Yuqori',
    yieldForecastTrend: '+ 5.7%',
    totalRevenue: '$24,560',
    totalRevenueStatus: 'Bu oy',
    totalRevenueTrend: '+ 12.5%'
  });

  // Moisture levels chart data dots
  const [activeChartPoint, setActiveChartPoint] = useState({ day: 'Payshanba', value: 65, x: 240, y: 75 });
  const chartPoints = [
    { day: 'Du', value: 35, x: 40, y: 110 },
    { day: 'Se', value: 30, x: 90, y: 120 },
    { day: 'Ch', value: 55, x: 140, y: 85 },
    { day: 'Pa', value: 65, x: 190, y: 75 },
    { day: 'Ju', value: 60, x: 240, y: 80 },
    { day: 'Sh', value: 85, x: 290, y: 40 },
    { day: 'Ya', value: 78, x: 340, y: 50 }
  ];

  // Try loading backend data if available, fallback to mock
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/user/dashboard');
        if (response.data) {
          setStats(prev => ({
            ...prev,
            cropHealth: response.data.healthStatus || '94%',
            waterReserve: response.data.waterStatus || '82%'
          }));
        }
      } catch (err) {
        console.error('Error fetching backend dashboard statistics:', err);
      }
    };
    fetchDashboardData();
  }, []);

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { sender: 'user', text: question };
    setAiChat(prev => [...prev, userMessage]);
    const userQ = question;
    setQuestion('');
    setAsking(true);

    setTimeout(() => {
      let aiResponseText = "Tushundim. AgroMind AI ma'lumotlariga ko'ra, siz ko'rsatgan holat bo'yicha sug'orish darajasi maqbul va ekinlar faol o'sish fazasida.";
      if (userQ.toLowerCase().includes('kasallik') || userQ.toLowerCase().includes('dog')) {
        aiResponseText = "Zamburug'li kasalliklar (masalan, Alternarioz) xavfi mavjud bo'lishi mumkin. Barg namligini nazorat qiling va namlik darajasini 60% atrofida saqlashga harakat qiling.";
      } else if (userQ.toLowerCase().includes('o\'g\'it') || userQ.toLowerCase().includes('ogit')) {
        aiResponseText = "Hozirgi o'sish fazasida azotli o'g'itlar (karbamid) berish tavsiya etiladi. O'g'itni sug'orish bilan birga 3 kundan keyin bering.";
      } else if (userQ.toLowerCase().includes('suv') || userQ.toLowerCase().includes('sug\'orish')) {
        aiResponseText = "Namlik darajasi optimal (65%). Hozircha sug'orish talab etilmaydi. Keyingi sug'orish sikli havo haroratiga ko'ra 3 kundan keyin tavsiya etiladi.";
      }
      
      setAiChat(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
      setAsking(false);
    }, 1200);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setScanning(true);
      setScanResult(null);

      // Simulate AI Scan
      setTimeout(() => {
        setScanResult({
          diseaseName: "Sariq zang (Puccinia striiformis)",
          probability: "92% Aniqlik",
          recommedation: "Zararlangan maydonni fungitsidlar bilan seping va ortiqcha sug'orishdan saqlaning. Qo'shni maydonlarga o'tishini oldini olish uchun zararlangan barglarni yo'q qiling."
        });
        setScanning(false);
      }, 2000);
    }
  };

  // Render tab contents dynamically
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardTab 
            stats={stats} 
            chartPoints={chartPoints} 
            activeChartPoint={activeChartPoint} 
            setActiveChartPoint={setActiveChartPoint}
            setActiveTab={setActiveTab}
          />
        );
      case 'crops':
        return <CropsTab />;
      case 'maps':
        return <MapsTab />;
      case 'irrigation':
        return <IrrigationTab />;
      case 'scanner':
        return (
          <ScannerTab 
            uploadedImage={uploadedImage}
            scanning={scanning}
            scanResult={scanResult}
            handleImageUpload={handleImageUpload}
          />
        );
      case 'reports':
        return <ReportsTab />;
      case 'ai':
        return (
          <AiTab 
            aiChat={aiChat}
            question={question}
            setQuestion={setQuestion}
            asking={asking}
            handleAskAI={handleAskAI}
          />
        );
      case 'notifications':
        return <NotificationsTab />;
      case 'settings':
        return <SettingsTab user={user} logout={logout} />;
      default:
        return <DashboardTab stats={stats} chartPoints={chartPoints} activeChartPoint={activeChartPoint} setActiveChartPoint={setActiveChartPoint} setActiveTab={setActiveTab} />;
    }
  };

  const handleQuickAction = (tab) => {
    setActiveTab(tab);
    setShowQuickActionModal(false);
  };

  return (
    <div className={`farmer-premium-dashboard ${theme === 'dark' ? 'dark-theme' : ''}`}>
      
      {/* Sidebar Navigation */}
      <aside className={`farmer-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>

        {/* Brand — logo + name only, no tagline */}
        <div className="farmer-sidebar-brand">
          <div className="farmer-logo-container">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 8.5C17 15 15 18 11 20z"></path>
              <path d="M19 2c-2.26 4.33-5.27 7.14-8 10"></path>
            </svg>
          </div>
          <span className="farmer-brand-text">AgroMind AI</span>
          <button className="sidebar-close-btn" onClick={() => setMobileMenuOpen(false)}>×</button>
        </div>

        {/* Main nav — icon + single label, no sub-text */}
        <nav className="farmer-sidebar-menu">
          {[
            { tab: 'dashboard',     icon: <Grid size={18} />,      label: t('tab_dashboard')     },
            { tab: 'crops',         icon: <Leaf size={18} />,      label: t('tab_crops')         },
            { tab: 'maps',          icon: <MapPin size={18} />,    label: t('tab_maps')          },
            { tab: 'irrigation',    icon: <Droplet size={18} />,   label: t('tab_irrigation')    },
            { tab: 'scanner',       icon: <Camera size={18} />,    label: t('tab_scanner')       },
            { tab: 'reports',       icon: <BarChart2 size={18} />, label: t('tab_reports')       },
            { tab: 'ai',            icon: <Brain size={18} />,     label: t('tab_ai')            },
            { tab: 'notifications', icon: <Bell size={18} />,      label: t('tab_notifications') },
            { tab: 'settings',      icon: <Settings size={18} />,  label: t('tab_settings')      },
          ].map(({ tab, icon, label }) => (
            <button
              key={tab}
              className={`farmer-sidebar-link${activeTab === tab ? ' active' : ''}`}
              onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
            >
              <span className="farmer-menu-icon">{icon}</span>
              <span className="farmer-menu-label">{label}</span>
            </button>
          ))}
        </nav>

        {/* Subscription card */}
        <div className="farmer-obuna-card">
          <div className="obuna-header">
            <span>{t('obuna_rejasi')}</span>
            <span className="badge-premium">{t('premium')}</span>
          </div>
          <p className="obuna-exp">{t('obuna_exp')}</p>
          <button className="obuna-action-btn">{t('rejani_yangilash')}</button>
        </div>

        {/* Bottom logout button */}
        <div className="sidebar-logout-area">
          <button
            className="sidebar-logout-btn"
            onClick={() => { logout(); setMobileMenuOpen(false); }}
          >
            <LogOut size={17} />
            <span>{t('logout') || 'Chiqish'}</span>
          </button>
        </div>

      </aside>

      {/* Main Container Area */}
      <div className="farmer-main-container">
        
        {/* Top Navbar */}
        <header className="farmer-navbar">
          <button className="sidebar-open-btn" onClick={() => setMobileMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="farmer-navbar-greetings">
            <h1>{t('welcome')}, {user?.username || 'Asror'}! 👋</h1>
            <p>{t('today_xo')}</p>
          </div>

          <div className="farmer-navbar-actions">
            
            {/* Global Search */}
            <div className="farmer-navbar-search">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder={t('search_placeholder')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="kbd-search-badge">⌘K</span>
            </div>

            {/* Notification triggers */}
            <div className="navbar-badge-btn" onClick={() => { setNotificationsOpen(!notificationsOpen); setMessagesOpen(false); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="badge-count bg-green-badge">3</span>
              {notificationsOpen && (
                <div className="notification-dropdown-box">
                  <div className="drop-header">{t('tab_notifications')}</div>
                  <div className="drop-item"><strong>Sug'orish tizimi</strong> muvaffaqiyatli tekshirildi</div>
                  <div className="drop-item"><strong>Kasallik xavfi</strong> barcha maydonlarda past</div>
                  <div className="drop-item">Yangi AI agronom tavsiyasi tayyor</div>
                </div>
              )}
            </div>

            {/* Messages triggers */}
            <div className="navbar-badge-btn" onClick={() => { setMessagesOpen(!messagesOpen); setNotificationsOpen(false); }}>
              <Mail size={20} className="message-icon" />
              <span className="badge-count bg-green-badge">2</span>
              {messagesOpen && (
                <div className="notification-dropdown-box">
                  <div className="drop-header">Xabarlar</div>
                  <div className="drop-item"><strong>Agronom:</strong> Ertaga o'g'itlashni boshlaymizmi?</div>
                  <div className="drop-item"><strong>Tizim:</strong> Oylik hosildorlik hisoboti tayyor</div>
                </div>
              )}
            </div>

            {/* Theme Toggle (Sun/Moon Button) */}
            <button className="navbar-theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>

            {/* Language Selection Selector in Navbar */}
            <div className="navbar-lang-badge-trigger" onClick={() => setLangDropdownOpen(!langDropdownOpen)} style={{ position: 'relative', cursor: 'pointer' }}>
              <div className="lang-trigger-btn">
                <Globe size={20} className="lang-trigger-icon" /> <span>{currentLanguage.toUpperCase()}</span>
              </div>
              {langDropdownOpen && (
                <div className="lang-dropdown-selector">
                  <div className="lang-option" onClick={() => changeLanguage('uz')}>UZ</div>
                  <div className="lang-option" onClick={() => changeLanguage('en')}>EN</div>
                  <div className="lang-option" onClick={() => changeLanguage('ru')}>RU</div>
                </div>
              )}
            </div>

            {/* Profile dropdown with Google photo + logout */}
            <div
              className="navbar-user-info"
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => setProfileDropdownOpen(prev => !prev)}
            >
              <div className="navbar-user-avatar">
                {user?.pictureUrl ? (
                  <img
                    src={user.pictureUrl}
                    alt={user.username || 'User'}
                    className="navbar-user-avatar-img"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="navbar-user-avatar-letter">
                    {user?.username?.charAt(0).toUpperCase() || 'A'}
                  </span>
                )}
              </div>

              {profileDropdownOpen && (
                <div className="profile-dropdown-menu" onClick={e => e.stopPropagation()}>
                  <div className="profile-dropdown-header">
                    <div className="profile-dropdown-avatar">
                      {user?.pictureUrl ? (
                        <img
                          src={user.pictureUrl}
                          alt={user.username || 'User'}
                          className="profile-dropdown-avatar-img"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="profile-dropdown-avatar-letter">
                          {user?.username?.charAt(0).toUpperCase() || 'A'}
                        </span>
                      )}
                    </div>
                    <div className="profile-dropdown-info">
                      <span className="profile-dropdown-name">{user?.username || 'Foydalanuvchi'}</span>
                      <span className="profile-dropdown-email">{user?.email || ''}</span>
                    </div>
                  </div>
                  <div className="profile-dropdown-divider" />
                  <button
                    className="profile-dropdown-item"
                    onClick={() => { setActiveTab('settings'); setProfileDropdownOpen(false); }}
                  >
                    <Settings size={16} />
                    <span>{t('tab_settings') || 'Sozlamalar'}</span>
                  </button>
                  <div className="profile-dropdown-divider" />
                  <button
                    className="profile-dropdown-item profile-dropdown-logout"
                    onClick={() => { logout(); setProfileDropdownOpen(false); }}
                  >
                    <LogOut size={16} />
                    <span>{t('logout') || 'Chiqish'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Sub-header row for updates/date controls */}
        <div className="farmer-subheader-bar">
          <button className="subheader-date-picker">
            <Calendar size={20} className="cal-icon" />
            <span>{t('today')}, 21 May 2024</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <div className="subheader-action-buttons">
            <button className="btn-refresh-telemetry" onClick={() => alert(t('update_data'))}>
              <RefreshCcw size={20} className="refresh-icon" />
              <span>{t('update_data')}</span>
            </button>
            <button className="btn-refresh-icon-only" onClick={() => alert(t('update_data'))}>
              <RefreshCcw size={20} className="refresh-icon" />
            </button>
          </div>
        </div>

        {/* Dynamic page content based on tab selection */}
        <div className="farmer-page-content">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <footer className="light-dashboard-footer">
          <span>© 2024 AgroMind AI. Smart Farming Assistant. {t('welcome')}!</span>
        </footer>

      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR matching mockup screenshot */}
      <nav className="farmer-bottom-nav-bar">
        <button 
          className={`bottom-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span className="icon">
            <Grid size={24} className="nav-svg-icon" />
          </span>
          <span className="lbl">{t('tab_dashboard') || 'Boshqaruv'}</span>
        </button>

        <button 
          className={`bottom-nav-item ${activeTab === 'crops' ? 'active' : ''}`}
          onClick={() => setActiveTab('crops')}
        >
          <span className="icon">
            <Leaf size={24} className="nav-svg-icon" />
          </span>
          <span className="lbl">{t('tab_crops') || 'Ekinlar'}</span>
        </button>

        {/* Elevated Plus action in center */}
        <div className="bottom-nav-item-center-wrap">
          <button className="bottom-nav-center-plus" onClick={() => setShowQuickActionModal(true)}>
            <Plus size={24} className="plus-icon" />
          </button>
        </div>

        <button 
          className={`bottom-nav-item ${activeTab === 'maps' ? 'active' : ''}`}
          onClick={() => setActiveTab('maps')}
        >
          <span className="icon">
            <MapPin size={24} className="nav-svg-icon" />
          </span>
          <span className="lbl">{t('tab_maps') || 'Xaritalar'}</span>
        </button>

        <button 
          className={`bottom-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <span className="icon">
            <Settings size={24} className="nav-svg-icon" />
          </span>
          <span className="lbl">{t('tab_profile') || 'Profil'}</span>
        </button>
      </nav>

      {/* Quick Action Modal for center + button click */}
      {showQuickActionModal && (
        <div className="light-modal-overlay" onClick={() => setShowQuickActionModal(false)}>
          <div className="light-modal-box quick-action-popup" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{t('quick_actions')}</h3>
              <button className="close-modal-btn" onClick={() => setShowQuickActionModal(false)}>×</button>
            </div>
            <div className="quick-actions-list-vertical">
              <button className="btn-quick-act" onClick={() => handleQuickAction('maps')}>
                <span className="icon">🗺️</span>
                <span>{t('add_field')}</span>
              </button>
              <button className="btn-quick-act" onClick={() => handleQuickAction('scanner')}>
                <span className="icon">📷</span>
                <span>{t('scan_leaf')}</span>
              </button>
              <button className="btn-quick-act" onClick={() => handleQuickAction('ai')}>
                <span className="icon">🧠</span>
                <span>{t('ask_ai')}</span>
              </button>
            </div>
            <button className="btn-modal-cancel" style={{ width: '100%', marginTop: '16px' }} onClick={() => setShowQuickActionModal(false)}>
              {t('close')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
