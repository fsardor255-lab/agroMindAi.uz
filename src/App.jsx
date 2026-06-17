import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import FarmerDashboard from './pages/dashboard/FarmerDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'

// Subcomponent rendering the landing page navbar and hero section
function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <>
      {/* Navbar / Header */}
      <header className="site-header">
        <div className="nav-container">
          {/* Logo Area */}
          <Link to="/" className="logo-area">
            <div className="logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 8.5C17 15 15 18 11 20z"></path>
                <path d="M19 2c-2.26 4.33-5.27 7.14-8 10"></path>
              </svg>
            </div>
            <span className="logo-text">AgroMind AI</span>
          </Link>

          {/* Navigation Links */}
          <nav className="nav-menu">
            <a href="#bosh-sahifa" className="nav-link">Bosh sahifa</a>
            <a href="#xususiyatlar" className="nav-link">Xususiyatlar</a>
            <a href="#qanday-ishlaydi" className="nav-link">Qanday ishlaydi</a>
            <a href="#narxlar" className="nav-link">Narxlar</a>
            <a href="#aloqa" className="nav-link">Aloqa</a>
          </nav>

          {/* Actions: Dynamic Login / Chiqish / CTA */}
          <div className="nav-actions">
            {user ? (
              <>
                <span className="user-profile-badge">
                  Fermer: <strong>{user.username}</strong>
                </span>
                <button onClick={logout} className="btn-logout">
                  Chiqish
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">Kirish</Link>
                <Link to="/register" className="btn-primary">Boshlash</Link>
              </>
            )}

            {/* Mobile menu toggle button */}
            <button 
              className="mobile-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menuni ochish/yopish"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          
          {/* Left Column: Text Content */}
          <div className="hero-content">
            
            {/* AI badge above title */}
            <div className="ai-badge">
              <span className="badge-pulse"></span>
              AgroMind AI v1.0
            </div>

            {/* Headings */}
            <h1 className="hero-title">
              Ekinlaringizni 
              <span>AI bilan boshqaring</span>
            </h1>

            {/* Description */}
            <p className="hero-desc">
              Kasallik aniqlash, suv optimizatsiya, hosil prognozi
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              {user ? (
                <a href="#app" className="btn-primary btn-hero-primary">
                  Platformaga o'tish <span className="btn-arrow">→</span>
                </a>
              ) : (
                <>
                  <Link to="/register" className="btn-primary btn-hero-primary">
                    Boshlash <span className="btn-arrow">→</span>
                  </Link>
                  <Link to="/login" className="btn-primary btn-hero-secondary">
                    Demo ko‘rish
                  </Link>
                </>
              )}
            </div>

          </div>

          {/* Right Column: Lottie Floating Animation & Stats Cards */}
          <div className="hero-animation">
            <div className="lottie-wrapper">
              
              {/* Concentric Decorative Rings */}
              <div className="decorative-ring ring-1"></div>
              <div className="decorative-ring ring-2"></div>
              <div className="decorative-ring ring-3"></div>
              
              {/* Circular color background */}
              <div className="lottie-circle-bg"></div>
              
              {/* Lottie Player custom element */}
              <dotlottie-player
                src="https://lottie.host/b984b79d-64d1-40ad-8305-4b6b3ee415f3/FXzLrH5tDE.lottie"
                autoplay
                loop
                style={{ width: '100%', height: '100%', position: 'relative', zIndex: 2 }}
              ></dotlottie-player>

              {/* Floating Card 1: Accuracy */}
              <div className="floating-card card-accuracy">
                <div className="card-icon icon-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="card-info">
                  <div className="card-title">98.4% Aniqlik</div>
                  <div className="card-desc">Kasalliklarni aniqlash</div>
                </div>
              </div>

              {/* Floating Card 2: Water Saving */}
              <div className="floating-card card-water">
                <div className="card-icon icon-blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"></path>
                  </svg>
                </div>
                <div className="card-info">
                  <div className="card-title">-35% Suv Sarfi</div>
                  <div className="card-desc">Aqlli sug'orish tizimi</div>
                </div>
              </div>

              {/* Floating Card 3: Yield Increase */}
              <div className="floating-card card-yield">
                <div className="card-icon icon-green-light">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className="card-info">
                  <div className="card-title">+25% Hosildorlik</div>
                  <div className="card-desc">AI agronom maslahatlari</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['FARMER']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
