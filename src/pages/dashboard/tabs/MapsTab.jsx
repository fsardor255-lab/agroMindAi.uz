import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';

export default function MapsTab() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="farmer-card animate fadeIn" style={{ padding: '24px' }}>
      <h2>Interaktiv maydonlar xaritasi</h2>
      <p className="subtitle" style={{ marginBottom: '20px' }}>Dalalarning geografik koordinatalari va datchik ko'rsatkichlari.</p>
      
      <div className="satellite-map-wrapper" style={{ height: '400px' }}>
        <svg className="fields-vector-map" viewBox="0 0 540 280" style={{ height: '320px' }}>
          <rect width="100%" height="100%" fill="#1b2a1a" />
          <polygon points="40,80 180,50 210,130 190,190 70,190" fill="rgba(21, 128, 61, 0.65)" stroke="#16a34a" strokeWidth="2" />
          <polygon points="190,50 280,30 330,110 220,130" fill="rgba(34, 197, 94, 0.55)" stroke="#4ade80" strokeWidth="2" />
          <polygon points="290,30 450,20 490,120 340,110" fill="rgba(234, 179, 8, 0.55)" stroke="#fde047" strokeWidth="2" />
          <polygon points="200,195 350,115 410,210 240,250" fill="rgba(34, 197, 94, 0.55)" stroke="#4ade80" strokeWidth="2" />
          <polygon points="350,115 490,120 520,200 420,210" fill="rgba(220, 38, 38, 0.6)" stroke="#f87171" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
