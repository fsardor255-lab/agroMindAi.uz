import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Barcha maydonlarni to‘ldiring');
      return;
    }

    setFormLoading(true);
    setFormError('');
    try {
      const loggedUser = await login(email, password);
      if (loggedUser.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setFormError(err.message || 'Login yoki parol xato');
    } finally {
      setFormLoading(false);
    }
  };

  // Google Login Token Exchange
  const handleGoogleCredentialResponse = async (response) => {
    setFormLoading(true);
    setFormError('');
    try {
      // Send verified token to backend
      const loggedUser = await loginWithGoogle(response.credential);
      if (loggedUser.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setFormError(err.message || 'Google login muvaffaqiyatsiz tugadi');
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "480019039601-hgjucatm24o3pgb12he0cf332fgobdnu.apps.googleusercontent.com",
        callback: handleGoogleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large", width: 440, shape: "rectangular" }
      );
    }
  }, []);

  return (
    <div className="auth-page-container">
      {/* Left: Animation side */}
      <div className="auth-visual-side">
        <div className="auth-glow-1"></div>
        <div className="auth-glow-2"></div>
        <div className="auth-visual-wrapper">
          <dotlottie-player
            src="https://lottie.host/b984b79d-64d1-40ad-8305-4b6b3ee415f3/FXzLrH5tDE.lottie"
            autoplay
            loop
            style={{ width: '85%', height: '85%' }}
          ></dotlottie-player>
          <div className="auth-visual-caption">
            <h3>AgroMind AI</h3>
            <p>Ekinlaringizni sun'iy intellekt orqali boshqaring va hosildorlikni oshiring.</p>
          </div>
        </div>
      </div>

      {/* Right: Form side */}
      <div className="auth-form-side">
        <div className="auth-form-card">
          <div className="auth-header-block">
            <Link to="/" className="auth-logo">
              <span className="logo-dot"></span>
              AgroMind AI
            </Link>
            <h2>Xush kelibsiz</h2>
            <p>Platformaga kirish uchun ma'lumotlaringizni kiriting</p>
          </div>

          {formError && (
            <div className="auth-error-alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form-body">
            <div className="auth-input-group">
              <label htmlFor="email">Email manzil</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={formLoading}
                required
              />
            </div>

            <div className="auth-input-group">
              <div className="label-row">
                <label htmlFor="password">Parol</label>
                <a href="#reset" className="forgot-link">Parolni unutdingizmi?</a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={formLoading}
                required
              />
            </div>

            <button type="submit" className="btn-auth-submit" disabled={formLoading}>
              {formLoading ? <span className="spinner"></span> : 'Tizimga kirish'}
            </button>
          </form>

          <div className="auth-divider">
            <span>Yoki</span>
          </div>

          <div id="googleBtn" style={{ display: 'flex', justifyContent: 'center' }}></div>

          <div className="auth-footer-prompt">
            Hisobingiz yo'qmi? <Link to="/register">Ro'yxatdan o'tish</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
