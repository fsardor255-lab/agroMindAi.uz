import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';

export default function ReportsTab() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="farmer-card animate fadeIn" style={{ padding: '24px' }}>
      <h2>Mavsumiy Hisobotlar va Statistika</h2>
      <p className="subtitle" style={{ marginBottom: '20px' }}>Ekin maydonlari oylik hosildorlik ko'rsatkichlari dinamikasi.</p>
      
      <div className="water-telemetry-metrics" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="water-metric-box">
          <span>O'tgan mavsumiy hosil</span>
          <strong>142 tonna</strong>
        </div>
        <div className="water-metric-box">
          <span>Tejalgan suv miqdori</span>
          <strong>420,000 litr</strong>
        </div>
      </div>
    </div>
  );
}
