import { useEffect, useState } from 'react';
import Timeline from '../components/Timeline';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/history')
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-nintendo-red mb-8">Histoire de la Nintendo 3DS</h1>
      <Timeline events={history} />
    </div>
  );
};

export default History;