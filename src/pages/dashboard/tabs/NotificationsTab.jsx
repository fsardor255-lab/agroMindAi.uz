import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';

export default function NotificationsTab() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="farmer-card animate fadeIn" style={{ padding: '24px' }}>
      <h2>Bildirishnomalar va Ogohlantirishlar</h2>
      <p className="subtitle" style={{ marginBottom: '20px' }}>Tizim datchiklaridan olingan datchik signallari va agronom xabarlari.</p>
      
      <div className="timeline-flow-list">
        <div className="timeline-item">
          <div className="timeline-icon-container bg-green-light">✔️</div>
          <div className="timeline-meta">
            <strong>Barcha datchiklar ishchi holatda</strong>
            <span className="time">Bugun, 09:15</span>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-icon-container bg-orange-light">⚠️</div>
          <div className="timeline-meta">
            <strong>Sabzavot-4 maydonida tuproq namligi juda past!</strong>
            <span className="time">Bugun, 08:30</span>
          </div>
        </div>
      </div>
    </div>
  );
}
