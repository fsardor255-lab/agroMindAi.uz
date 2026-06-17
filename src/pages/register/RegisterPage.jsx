import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setFormError('Iltimos, barcha majburiy maydonlarni to‘ldiring');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Parollar bir-biriga mos kelmadi');
      return;
    }

    if (password.length < 6) {
      setFormError('Parol kamida 6 ta belgidan iborat bo‘lishi kerak');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      const loggedUser = await register(username, email, password, phoneNumber);
      if (loggedUser.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setFormError(err.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
    } finally {
      setFormLoading(false);
    }
  };

  const handleGoogleCredentialResponse = async (response) => {
    setFormLoading(true);
    setFormError('');
    try {
      const loggedUser = await loginWithGoogle(response.credential);
      if (loggedUser.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setFormError(err.message || 'Google orqali ro‘yxatdan o‘tish muvaffaqiyatsiz tugadi');
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
            <h2>Foydalanuvchi hisobini yaratish</h2>
            <p>Ma'lumotlaringizni kiritib, ro'yxatdan o'ting</p>
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
              <label htmlFor="username">Foydalanuvchi nomi *</label>
              <input
                id="username"
                type="text"
                placeholder="Fermer_123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={formLoading}
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="email">Email manzil *</label>
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
              <label htmlFor="phone">Telefon raqami</label>
              <input
                id="phone"
                type="tel"
                placeholder="+998901234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={formLoading}
              />
            </div>

            <div className="auth-input-row">
              <div className="auth-input-group">
                <label htmlFor="password">Parol *</label>
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

              <div className="auth-input-group">
                <label htmlFor="confirmPassword">Tasdiqlash *</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={formLoading}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-auth-submit" disabled={formLoading}>
              {formLoading ? <span className="spinner"></span> : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <div className="auth-divider">
            <span>Yoki</span>
          </div>

          <div id="googleBtn" style={{ display: 'flex', justifyContent: 'center' }}></div>

          <div className="auth-footer-prompt">
            Hisobingiz bormi? <Link to="/login">Kirish</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
