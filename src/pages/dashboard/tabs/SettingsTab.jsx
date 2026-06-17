import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';

export default function SettingsTab({ user, logout }) {
  const { t, currentLanguage, changeLanguage } = useContext(LanguageContext);

  return (
    <div className="farmer-card settings-card-content animate fadeIn" style={{ padding: '24px' }}>
      <h2>Fermer sozlamalari</h2>
      <p className="subtitle" style={{ marginBottom: '20px' }}>Shaxsiy profil ma'lumotlari va bildirishnomalar sozlamalari.</p>

      <form className="settings-light-form" onSubmit={(e) => { e.preventDefault(); alert("Sozlamalar saqlandi!"); }}>
        <div className="form-input-pair">
          <label>Foydalanuvchi nomi</label>
          <input type="text" defaultValue={user?.username || 'Asror Fayzullayev'} />
        </div>
        <div className="form-input-pair" style={{ marginTop: '16px' }}>
          <label>Email manzil</label>
          <input type="email" defaultValue={user?.email || 'asror@gmail.com'} />
        </div>
        
        {/* Language selector within settings tab */}
        <div className="form-input-pair" style={{ marginTop: '16px' }}>
          <label>Tizim tili (Language)</label>
          <select value={currentLanguage} onChange={(e) => changeLanguage(e.target.value)}>
            <option value="uz">O'zbekcha (UZ)</option>
            <option value="en">English (EN)</option>
            <option value="ru">Русский (RU)</option>
          </select>
        </div>

        <button type="submit" className="btn-add-farm-premium" style={{ marginTop: '24px' }}>Saqlash</button>
      </form>

      <button 
        onClick={() => { if (window.confirm(t('confirm_logout'))) logout(); }} 
        className="btn-table-action btn-delete" 
        style={{ marginTop: '24px', width: '100%', padding: '12px', borderRadius: '12px' }}
      >
        Tizimdan chiqish (Logout)
      </button>
    </div>
  );
}
