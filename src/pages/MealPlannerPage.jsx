import { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { loadData, addMeal } from '../utils/storage';
import { calculateNutrients } from '../utils/ocrParser';

function MealPlannerPage() {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [mealName, setMealName] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const data = loadData();
    setProducts(data.products);
  }, []);

  const handleAddItem = (product) => {
    const newItem = {
      ...product,
      grams: 100,
      calculated: calculateNutrients(product, 100),
    };
    setSelectedItems([...selectedItems, newItem]);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleGramsChange = (index, grams) => {
    const updated = [...selectedItems];
    updated[index].grams = parseInt(grams) || 100;
    updated[index].calculated = calculateNutrients(updated[index], parseInt(grams) || 100);
    setSelectedItems(updated);
  };

  const handleSaveMeal = () => {
    if (selectedItems.length === 0) return;
    
    const meal = {
      name: mealName || 'Untitled Meal',
      items: selectedItems.map(item => ({
        name: item.name,
        grams: item.grams,
        calories: item.calculated.calories,
        protein: item.calculated.protein,
        totalCarbs: item.calculated.totalCarbs,
        totalFat: item.calculated.totalFat,
        sodium: item.calculated.sodium,
      })),
    };
    
    addMeal(meal);
    setSelectedItems([]);
    setMealName('');
    setShowForm(false);
    alert('Meal saved!');
  };

  const getTotalNutrients = () => {
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sodium: 0,
    };

    selectedItems.forEach(item => {
      totals.calories += item.calculated.calories;
      totals.protein += parseFloat(item.calculated.protein) || 0;
      totals.carbs += parseFloat(item.calculated.totalCarbs) || 0;
      totals.fat += parseFloat(item.calculated.totalFat) || 0;
      totals.sodium += item.calculated.sodium || 0;
    });

    return totals;
  };

  const totals = getTotalNutrients();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Meal Planner</h2>

      {!showForm ? (
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <p className="text-gray-600 mb-4">Create a new meal by adding products</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto"
          >
            <Plus size={20} className="mr-2" />
            New Meal
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <input
              type="text"
              placeholder="Meal name (e.g., Breakfast)"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="w-full text-lg font-semibold border-b border-gray-200 pb-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Add Products</h3>
            
            {products.length === 0 ? (
              <p className="text-gray-500 text-sm">No products scanned yet. Go scan some nutrition labels!</p>
            ) : (
              <div className="space-y-2">
                {products.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleAddItem(product)}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-600">
                      {product.calories} cal per serving
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedItems.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold mb-3">Selected Items</h3>
              
              <div className="space-y-3">
                {selectedItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.grams}g</div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 text-center text-sm">
                      <div>
                        <div className="font-medium">{item.calculated.calories}</div>
                        <div className="text-gray-500">cal</div>
                      </div>
                      <div>
                        <div className="font-medium">{item.calculated.protein}g</div>
                        <div className="text-gray-500">protein</div>
                      </div>
                      <div>
                        <div className="font-medium">{item.calculated.totalCarbs}g</div>
                        <div className="text-gray-500">carbs</div>
                      </div>
                      <div>
                        <div className="font-medium">{item.calculated.totalFat}g</div>
                        <div className="text-gray-500">fat</div>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <label className="block text-xs text-gray-600 mb-1">Grams:</label>
                      <input
                        type="number"
                        value={item.grams}
                        onChange={(e) => handleGramsChange(index, e.target.value)}
                        className="w-20 p-1 border rounded text-center"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Total Nutrients</h4>
                <div className="grid grid-cols-5 gap-2 text-center text-sm">
                  <div>
                    <div className="font-bold text-green-700">{Math.round(totals.calories)}</div>
                    <div className="text-gray-500">cal</div>
                  </div>
                  <div>
                    <div className="font-bold text-blue-700">{totals.protein.toFixed(1)}g</div>
                    <div className="text-gray-500">protein</div>
                  </div>
                  <div>
                    <div className="font-bold text-yellow-700">{totals.carbs.toFixed(1)}g</div>
                    <div className="text-gray-500">carbs</div>
                  </div>
                  <div>
                    <div className="font-bold text-red-700">{totals.fat.toFixed(1)}g</div>
                    <div className="text-gray-500">fat</div>
                  </div>
                  <div>
                    <div className="font-bold text-purple-700">{totals.sodium}mg</div>
                    <div className="text-gray-500">sodium</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveMeal}
                className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
              >
                <Save size={20} className="mr-2" />
                Save Meal
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MealPlannerPage;
