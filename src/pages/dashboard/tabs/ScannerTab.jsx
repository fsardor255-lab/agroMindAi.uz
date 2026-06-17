import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';

export default function ScannerTab({ uploadedImage, scanning, scanResult, handleImageUpload }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="farmer-card animate fadeIn" style={{ padding: '24px' }}>
      <h2>AI kasalliklarni aniqlash skaneri</h2>
      <p className="subtitle" style={{ marginBottom: '24px' }}>Ekin bargi yoki shikastlangan meva rasmini yuklang va AI orqali tashxis oling.</p>

      <div className="scanner-layout-grid">
        <div className="mock-upload-area">
          {uploadedImage ? (
            <img src={uploadedImage} alt="Uploaded crop leaf" className="leaf-preview-img" style={{ maxHeight: '180px', borderRadius: '12px' }} />
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="upload-icon-svg">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          )}
          <h3>Daladan rasm yuklang</h3>
          <p>Rasm faylini bu yerga torting yoki diskdan tanlang (PNG, JPG)</p>
          
          <label className="btn-add-farm-premium" style={{ display: 'inline-block', marginTop: '16px', cursor: 'pointer' }}>
            Rasm tanlash
            <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />
          </label>
        </div>

        <div className="scan-results-box">
          {scanning ? (
            <div className="scan-loader-simulation">
              <span className="spinner">🔄</span>
              <p>AI tasvirni tahlil qilmoqda...</p>
            </div>
          ) : scanResult ? (
            <div className="result-content animate fadeIn">
              <h4 className="red-text">Kasallik: {scanResult.diseaseName}</h4>
              <span className="probability">{scanResult.probability}</span>
              <div className="recom" style={{ marginTop: '12px' }}>
                <strong>AI tavsiyasi:</strong>
                <p>{scanResult.recommedation}</p>
              </div>
            </div>
          ) : (
            <div className="placeholder-scan-text">
              <p>Hozircha tahlillar yo'q. Chap tarafdan barg rasmini yuklang.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
