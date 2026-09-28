import { useState, useRef } from 'react';
import { Camera, Upload, Check, Edit3 } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { parseNutritionText, calculateNutrients } from '../utils/ocrParser';
import { addProduct } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

function ScanPage() {
  const [status, setStatus] = useState('idle'); // idle, scanning, result, editing
  const [image, setImage] = useState(null);
  const [rawText, setRawText] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [editData, setEditData] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    setImage(file);
    setStatus('scanning');
    
    try {
      const result = await Tesseract.recognize(file, 'eng');
      const text = result.data.text;
      setRawText(text);
      
      const parsed = parseNutritionText(text);
      setParsedData(parsed);
      setEditData({ ...parsed });
      setStatus('result');
    } catch (error) {
      console.error('OCR Error:', error);
      setStatus('error');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const handleSave = () => {
    addProduct(editData);
    navigate('/meals');
  };

  const handleAddToMeal = () => {
    addProduct(editData);
    navigate('/meals');
  };

  if (status === 'scanning') {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
        <p className="text-gray-600">Scanning nutrition label...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center p-6">
        <p className="text-red-600 mb-4">Error scanning image. Please try again.</p>
        <button
          onClick={() => setStatus('idle')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (status === 'result' && editData) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Scan Result</h2>
        
        {image && (
          <div className="relative">
            <img src={URL.createObjectURL(image)} alt="Scanned" className="w-full h-48 object-cover rounded-lg" />
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              Original
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Edit Nutrition Info</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Calories</label>
                <input
                  type="number"
                  value={editData.calories}
                  onChange={(e) => setEditData({ ...editData, calories: parseInt(e.target.value) || 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Serving Size</label>
                <input
                  type="text"
                  value={editData.servingSize}
                  onChange={(e) => setEditData({ ...editData, servingSize: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                <input
                  type="number"
                  value={editData.protein}
                  onChange={(e) => setEditData({ ...editData, protein: parseFloat(e.target.value) || 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                <input
                  type="number"
                  value={editData.totalCarbs}
                  onChange={(e) => setEditData({ ...editData, totalCarbs: parseFloat(e.target.value) || 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
                <input
                  type="number"
                  value={editData.totalFat}
                  onChange={(e) => setEditData({ ...editData, totalFat: parseFloat(e.target.value) || 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sodium (mg)</label>
                <input
                  type="number"
                  value={editData.sodium}
                  onChange={(e) => setEditData({ ...editData, sodium: parseInt(e.target.value) || 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setStatus('idle')}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium"
          >
            Retake
          </button>
          <button
            onClick={handleAddToMeal}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
          >
            <Check size={20} className="mr-2" />
            Add to Meal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Scan Nutrition Label</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <Camera size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 mb-4">Take a photo of a nutrition facts label</p>
        
        <div className="space-y-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium"
          >
            Take Photo
          </button>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center"
          >
            <Upload size={20} className="mr-2" />
            Upload Image
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Tips for best results:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Ensure good lighting</li>
          <li>• Keep the camera steady</li>
          <li>• Make sure the text is clear and readable</li>
          <li>• You can edit the results after scanning</li>
        </ul>
      </div>
    </div>
  );
}

export default ScanPage;
