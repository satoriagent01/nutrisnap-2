import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Camera, Utensils, History, Home } from 'lucide-react';
import ScanPage from './pages/ScanPage';
import MealPlannerPage from './pages/MealPlannerPage';
import HistoryPage from './pages/HistoryPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-16">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-green-700">NutriSnap</h1>
        </header>
        
        <main className="p-4">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/meals" element={<MealPlannerPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-2 z-10">
          <Link to="/" className="flex flex-col items-center text-gray-500 hover:text-green-600">
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/scan" className="flex flex-col items-center text-gray-500 hover:text-green-600">
            <Camera size={24} />
            <span className="text-xs mt-1">Scan</span>
          </Link>
          <Link to="/meals" className="flex flex-col items-center text-gray-500 hover:text-green-600">
            <Utensils size={24} />
            <span className="text-xs mt-1">Meals</span>
          </Link>
          <Link to="/history" className="flex flex-col items-center text-gray-500 hover:text-green-600">
            <History size={24} />
            <span className="text-xs mt-1">History</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
