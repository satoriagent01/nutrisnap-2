import { describe, it, expect } from 'vitest';
import { parseNutritionText, calculateNutrients } from '../utils/ocrParser';

describe('parseNutritionText', () => {
  it('should parse calories', () => {
    const text = 'Nutrition Facts\nCalories 250\nTotal Fat 12g';
    const result = parseNutritionText(text);
    expect(result.calories).toBe(250);
  });

  it('should parse protein', () => {
    const text = 'Protein 20g';
    const result = parseNutritionText(text);
    expect(result.protein).toBe(20);
  });

  it('should parse sodium', () => {
    const text = 'Sodium 500mg';
    const result = parseNutritionText(text);
    expect(result.sodium).toBe(500);
  });

  it('should parse total carbs', () => {
    const text = 'Total Carbohydrate 30g';
    const result = parseNutritionText(text);
    expect(result.totalCarbs).toBe(30);
  });

  it('should parse saturated fat', () => {
    const text = 'Saturated Fat 5g';
    const result = parseNutritionText(text);
    expect(result.saturatedFat).toBe(5);
  });

  it('should default to 0 for missing values', () => {
    const text = 'Calories 100';
    const result = parseNutritionText(text);
    expect(result.protein).toBe(0);
    expect(result.totalFat).toBe(0);
  });

  it('should extract product name from first line', () => {
    const text = 'Organic Granola\nCalories 200';
    const result = parseNutritionText(text);
    expect(result.name).toBe('Organic Granola');
  });
});

describe('calculateNutrients', () => {
  it('should calculate nutrients for 100g serving', () => {
    const nutrients = { calories: 200, protein: 10, totalCarbs: 20, totalFat: 5 };
    const result = calculateNutrients(nutrients, 100);
    expect(result.calories).toBe(200);
    expect(result.protein).toBe('10.0');
  });

  it('should calculate nutrients for 50g serving', () => {
    const nutrients = { calories: 200, protein: 10, totalCarbs: 20, totalFat: 5 };
    const result = calculateNutrients(nutrients, 50);
    expect(result.calories).toBe(100);
    expect(result.protein).toBe('5.0');
  });

  it('should calculate nutrients for 200g serving', () => {
    const nutrients = { calories: 200, protein: 10, totalCarbs: 20, totalFat: 5 };
    const result = calculateNutrients(nutrients, 200);
    expect(result.calories).toBe(400);
    expect(result.protein).toBe('20.0');
  });
});
