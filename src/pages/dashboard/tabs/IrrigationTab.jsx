import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';

export default function IrrigationTab() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="farmer-card animate fadeIn" style={{ padding: '24px' }}>
      <h2>Sug'orish datchiklari va monitoring</h2>
      <p className="subtitle" style={{ marginBottom: '20px' }}>Tuproq namligi va avtomatik sug'orish klapanlari nazorati.</p>
      
      <div className="water-telemetry-metrics" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '24px' }}>
        <div className="water-metric-box">
          <span>O'rtacha namlik darajasi</span>
          <strong>65%</strong>
        </div>
        <div className="water-metric-box">
          <span>Klapanlar holati</span>
          <strong className="green-text">Yopiq</strong>
        </div>
        <div className="water-metric-box">
          <span>Keyingi rejalashtirilgan suv</span>
          <strong>Ertaga, 08:00</strong>
        </div>
      </div>

      <div className="alert-box-info" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.15)', color: '#1e40af' }}>
        ℹ️ <strong>Sug'orish tavsiyasi:</strong> Namlik optimal darajada bo'lganligi sababli bugun sug'orish o'chirildi. Bu orqali 35% suv resursi tejaldi.
      </div>
    </div>
  );
}
