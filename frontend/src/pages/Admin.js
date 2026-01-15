import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [historyData, setHistoryData] = useState('');
  const [successData, setSuccessData] = useState('');
  const [marketData, setMarketData] = useState('');
  const [message, setMessage] = useState('');

  const loadData = async (section) => {
    try {
      const response = await axios.get(`/api/${section}`);
      const data = JSON.stringify(response.data, null, 2);
      
      if (section === 'history') setHistoryData(data);
      if (section === 'success') setSuccessData(data);
      if (section === 'market') setMarketData(data);
      
      setMessage(`✅ Données ${section} chargées`);
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    }
  };

  const saveData = async (section) => {
    try {
      const data = section === 'history' ? historyData : 
                   section === 'success' ? successData : marketData;
      
      await axios.put(`/api/${section}`, JSON.parse(data));
      setMessage(`✅ Données ${section} sauvegardées`);
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    }
  };

  useEffect(() => {
    loadData('history');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Interface Admin</h1>
        
        {message && (
          <div className={`p-4 mb-4 rounded ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="flex space-x-4 mb-6">
          {['history', 'success', 'market'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => {
                setActiveTab(tab);
                loadData(tab);
              }}
            >
              {tab === 'history' ? '📜 Histoire' : 
               tab === 'success' ? '🏆 Succès' : '📈 Marché'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {activeTab === 'history' ? 'Données Histoire' :
               activeTab === 'success' ? 'Données Succès' : 'Données Marché'}
            </h2>
            <div className="space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => loadData(activeTab)}
              >
                🔄 Charger
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => saveData(activeTab)}
              >
                💾 Sauvegarder
              </button>
            </div>
          </div>

          <textarea
            className="w-full h-96 p-4 border rounded font-mono text-sm"
            value={activeTab === 'history' ? historyData : 
                   activeTab === 'success' ? successData : marketData}
            onChange={(e) => {
              if (activeTab === 'history') setHistoryData(e.target.value);
              if (activeTab === 'success') setSuccessData(e.target.value);
              if (activeTab === 'market') setMarketData(e.target.value);
            }}
            placeholder="Données JSON..."
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;