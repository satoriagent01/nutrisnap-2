import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Utensils, TrendingUp } from 'lucide-react';
import { loadData } from '../utils/storage';

function DashboardPage() {
  const [todayStats, setTodayStats] = useState(null);

  useEffect(() => {
    const data = loadData();
    const today = new Date().toDateString();
    const todayMeals = data.meals.filter(m => new Date(m.date).toDateString() === today);
    
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    todayMeals.forEach(meal => {
      meal.items.forEach(item => {
        totals.calories += item.calories || 0;
        totals.protein += parseFloat(item.protein) || 0;
        totals.carbs += parseFloat(item.totalCarbs) || 0;
        totals.fat += parseFloat(item.totalFat) || 0;
      });
    });

    setTodayStats(totals);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Today's Overview</h2>
        
        {todayStats ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Calories</p>
              <p className="text-2xl font-bold text-green-700">{Math.round(todayStats.calories)}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Protein</p>
              <p className="text-2xl font-bold text-blue-700">{todayStats.protein.toFixed(1)}g</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Carbs</p>
              <p className="text-2xl font-bold text-yellow-700">{todayStats.carbs.toFixed(1)}g</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Fat</p>
              <p className="text-2xl font-bold text-red-700">{todayStats.fat.toFixed(1)}g</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No meals logged today. Start scanning!</p>
        )}
      </div>

      <div className="space-y-3">
        <Link
          to="/scan"
          className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Camera className="text-green-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold">Scan Nutrition Label</h3>
            <p className="text-sm text-gray-600">Take a photo or upload an image</p>
          </div>
        </Link>

        <Link
          to="/meals"
          className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Utensils className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold">Meal Planner</h3>
            <p className="text-sm text-gray-600">Plan and track your meals</p>
          </div>
        </Link>

        <Link
          to="/history"
          className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <TrendingUp className="text-purple-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold">History</h3>
            <p className="text-sm text-gray-600">View your nutrition history</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;
