/**
 * Parses raw OCR text from a nutrition label into structured data.
 * Uses regex to find common patterns like "Calories 200" or "Sodium 500mg".
 */

const PATTERNS = [
  { key: 'calories', regex: /(?:calories?|energy)\s*[:\-]?\s*(\d+)/i },
  { key: 'totalFat', regex: /(?:total\s*fat|fat)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:g|gram)/i },
  { key: 'saturatedFat', regex: /(?:saturated\s*fat|sat\.?\s*fat)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:g|gram)/i },
  { key: 'transFat', regex: /(?:trans\s*fat)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:g|gram)/i },
  { key: 'cholesterol', regex: /(?:cholesterol)\s*[:\-]?\s*(\d+)\s*(?:mg)/i },
  { key: 'sodium', regex: /(?:sodium)\s*[:\-]?\s*(\d+)\s*(?:mg)/i },
  { key: 'totalCarbs', regex: /(?:total\s*carbohydrate|carbs?)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:g|gram)/i },
  { key: 'dietaryFiber', regex: /(?:dietary\s*fiber|fiber)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:g|gram)/i },
  { key: 'sugars', regex: /(?:sugars?)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:g|gram)/i },
  { key: 'protein', regex: /(?:protein)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:g|gram)/i },
  { key: 'servingSize', regex: /(?:serving\s*size|per\s*serving)\s*[:\-]?\s*(.+?)(?:\n|$)/i },
];

export function parseNutritionText(text) {
  const result = {
    name: 'Unknown Product',
    servingSize: '1 serving',
    calories: 0,
    totalFat: 0,
    saturatedFat: 0,
    transFat: 0,
    cholesterol: 0,
    sodium: 0,
    totalCarbs: 0,
    dietaryFiber: 0,
    sugars: 0,
    protein: 0,
  };

  // Try to find product name (usually first line or contains "Product")
  const lines = text.split('\n');
  if (lines.length > 0) {
    result.name = lines[0].trim() || 'Unknown Product';
  }

  PATTERNS.forEach(({ key, regex }) => {
    const match = text.match(regex);
    if (match) {
      if (key === 'servingSize') {
        result[key] = match[1].trim();
      } else {
        result[key] = parseFloat(match[1]) || 0;
      }
    }
  });

  return result;
}

export function calculateNutrients(nutrients, grams) {
  // Standard serving size assumed to be 100g for calculation if not specified
  // In a real app, we'd store the original serving size grams
  const factor = grams / 100;
  
  return {
    calories: Math.round(nutrients.calories * factor),
    totalFat: (nutrients.totalFat * factor).toFixed(1),
    saturatedFat: (nutrients.saturatedFat * factor).toFixed(1),
    cholesterol: Math.round(nutrients.cholesterol * factor),
    sodium: Math.round(nutrients.sodium * factor),
    totalCarbs: (nutrients.totalCarbs * factor).toFixed(1),
    dietaryFiber: (nutrients.dietaryFiber * factor).toFixed(1),
    sugars: (nutrients.sugars * factor).toFixed(1),
    protein: (nutrients.protein * factor).toFixed(1),
  };
}
