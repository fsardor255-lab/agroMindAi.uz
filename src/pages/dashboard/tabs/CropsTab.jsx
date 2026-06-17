import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';

export default function CropsTab() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="farmer-card crud-card-wrapper animate fadeIn">
      <div className="section-header-row" style={{ padding: '24px 24px 0 24px' }}>
        <div>
          <h2>{t('tab_crops')} va maydonlar ro'yxati</h2>
          <p className="subtitle">Daladagi ekin turlari, unib chiqish darajasi va sug'orish koeffitsiyenti.</p>
        </div>
      </div>
      
      <div className="responsive-table-holder" style={{ marginTop: '20px' }}>
        <table className="light-dashboard-table">
          <thead>
            <tr>
              <th>Ekin turi</th>
              <th>Maydon</th>
              <th>Hajmi</th>
              <th>Tuproq namligi</th>
              <th>{t('kpi_pest_risk')}</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Paxta (Chigit-1)</strong></td>
              <td>Paxta-1 maydoni</td>
              <td>12.5 ga</td>
              <td>65% (Optimal)</td>
              <td><span className="priority-badge low">Past (12%)</span></td>
              <td><span className="status-badge-premium active">A'lo</span></td>
            </tr>
            <tr>
              <td><strong>Bug'doy (G'alla)</strong></td>
              <td>G'alla-2 maydoni</td>
              <td>8.3 ga</td>
              <td>60% (Optimal)</td>
              <td><span className="priority-badge low">Past (8%)</span></td>
              <td><span className="status-badge-premium active">Yaxshi</span></td>
            </tr>
            <tr>
              <td><strong>Makkajo'xori</strong></td>
              <td>Makkajo'xori-3 maydoni</td>
              <td>15.7 ga</td>
              <td>45% (Kam)</td>
              <td><span className="priority-badge medium">O'rtacha (22%)</span></td>
              <td><span className="status-badge-premium pending">O'rtacha</span></td>
            </tr>
            <tr>
              <td><strong>Sabzavotlar (Pomidor)</strong></td>
              <td>Sabzavot-4 maydoni</td>
              <td>4.2 ga</td>
              <td>32% (Kritik)</td>
              <td><span className="priority-badge high">Yuqori (45%)</span></td>
              <td><span className="status-badge-premium inactive">Kritik</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
