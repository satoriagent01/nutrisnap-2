# NutriSnap - Project Plan

## Requirements

1. **OCR Scanning**: Take photos of nutrition labels and extract nutritional information
2. **Custom Tracking**: Track any nutrient (calories, sodium, saturated fats, etc.) - no predefined limits
3. **Meal Planner**: Build meals by combining products with custom gram amounts
4. **Free & Open Source**: No ads, no paywalls, no subscriptions
5. **Privacy First**: All data stored locally

## Architecture

- **Frontend**: React SPA with Vite
- **OCR**: Tesseract.js (client-side, no API calls)
- **Storage**: LocalStorage for persistence
- **Styling**: Tailwind CSS

## Decisions

1. **Client-side OCR**: No backend needed, keeps it free and private
2. **LocalStorage**: Simple, no auth required, works offline
3. **Heuristic parsing**: Regex-based extraction from OCR text
4. **100g baseline**: Nutrient calculations based on 100g reference

## What's Built

- ✅ OCR scanning with Tesseract.js
- ✅ Editable nutrition data after scan
- ✅ Product library
- ✅ Meal planner with custom grams
- ✅ Nutrient calculation (calories, protein, carbs, fat, sodium)
- ✅ History view
- ✅ Dashboard with daily overview
- ✅ Tests for OCR parser
- ✅ CI/CD workflow

## What's Next

- Cloud sync
- Barcode scanning
- Food database
- Export functionality
- Dark mode
- PWA support
