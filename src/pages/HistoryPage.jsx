import { useState, useEffect } from 'react';
import { getHistory } from '../utils/storage';
import { format } from 'date-fns';

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = getHistory();
    setHistory(data);
  }, []);

  if (history.length === 0) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-bold mb-4">History</h2>
        <p className="text-gray-600">No history yet. Start tracking your meals!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">History</h2>
      
      <div className="space-y-3">
        {history.map((entry, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{entry.name}</h3>
              <span className="text-sm text-gray-500">
                {format(new Date(entry.date), 'MMM d, yyyy')}
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div>
                <div className="font-medium">{Math.round(entry.calories)}</div>
                <div className="text-gray-500">cal</div>
              </div>
              <div>
                <div className="font-medium">{entry.protein}g</div>
                <div className="text-gray-500">protein</div>
              </div>
              <div>
                <div className="font-medium">{entry.carbs}g</div>
                <div className="text-gray-500">carbs</div>
              </div>
              <div>
                <div className="font-medium">{entry.fat}g</div>
                <div className="text-gray-500">fat</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
