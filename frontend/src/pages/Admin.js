import { useState, useEffect } from 'react';
import axios from 'axios';
import { Scroll, Trophy, TrendingUp, RefreshCcw, Save, CheckCircle, XCircle } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [historyData, setHistoryData] = useState('');
  const [successData, setSuccessData] = useState('');
  const [marketData, setMarketData] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const loadData = async (section) => {
    try {
      const response = await axios.get(`/api/${section}`);
      const data = JSON.stringify(response.data, null, 2);

      if (section === 'history') setHistoryData(data);
      if (section === 'success') setSuccessData(data);
      if (section === 'market') setMarketData(data);

      setMessage({ text: `Données ${section} chargées`, type: 'success' });
    } catch (error) {
      setMessage({ text: `Erreur: ${error.message}`, type: 'error' });
    }
  };

  const saveData = async (section) => {
    try {
      const data = section === 'history' ? historyData :
        section === 'success' ? successData : marketData;

      await axios.put(`/api/${section}`, JSON.parse(data));
      setMessage({ text: `Données ${section} sauvegardées`, type: 'success' });
    } catch (error) {
      setMessage({ text: `Erreur: ${error.message}`, type: 'error' });
    }
  };

  useEffect(() => {
    loadData('history');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Interface Admin</h1>

        {message.text && (
          <div className={`p-4 mb-4 rounded flex items-center space-x-2 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="flex space-x-4 mb-6">
          {[
            { id: 'history', label: 'Histoire', icon: <Scroll size={18} /> },
            { id: 'success', label: 'Succès', icon: <Trophy size={18} /> },
            { id: 'market', label: 'Marché', icon: <TrendingUp size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded flex items-center space-x-2 ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => {
                setActiveTab(tab.id);
                loadData(tab.id);
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {activeTab === 'history' ? 'Données Histoire' :
                activeTab === 'success' ? 'Données Succès' : 'Données Marché'}
            </h2>
            <div className="space-x-2 flex">
              <button
                className="px-4 py-2 bg-gray-200 rounded flex items-center space-x-2"
                onClick={() => loadData(activeTab)}
              >
                <RefreshCcw size={18} />
                <span>Charger</span>
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded flex items-center space-x-2"
                onClick={() => saveData(activeTab)}
              >
                <Save size={18} />
                <span>Sauvegarder</span>
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