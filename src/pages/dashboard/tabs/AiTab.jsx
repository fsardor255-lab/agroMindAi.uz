import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';

export default function AiTab({ aiChat, question, setQuestion, asking, handleAskAI }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="farmer-card animate fadeIn" style={{ padding: '24px' }}>
      <h2>Sun'iy intellekt AI agronom maslahatlari</h2>
      <p className="subtitle" style={{ marginBottom: '24px' }}>AI agronomimiz datchik ko'rsatkichlari bo'yicha sizga 24/7 yordam beradi.</p>

      <div className="ai-chat-window-box">
        <div className="chat-messages-container">
          {aiChat.map((msg, i) => (
            <div key={i} className={`chat-bubble-row ${msg.sender === 'user' ? 'user' : 'ai'}`}>
              <div className="avatar">
                {msg.sender === 'user' ? 'U' : '🤖'}
              </div>
              <div className="text-bubble">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {asking && (
            <div className="chat-bubble-row ai">
              <div className="avatar">🤖</div>
              <div className="text-bubble loading-dots">
                <span>•</span><span>•</span><span>•</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleAskAI} className="ai-chat-input-bar">
          <input 
            type="text" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            placeholder="AI agronomdan maslahat olish uchun savol yozing... (masalan: o'g'itlash qachon kerak?)"
            disabled={asking}
          />
          <button type="submit" className="btn-add-farm-premium" disabled={asking}>Jo'natish</button>
        </form>
      </div>
    </div>
  );
}
