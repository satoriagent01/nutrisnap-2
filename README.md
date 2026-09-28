# NutriSnap

**Free, open-source nutrition tracker with OCR for food labels. No ads, no paywalls.**

NutriSnap helps you track your nutrition by scanning food labels with your camera. Unlike other apps that lock features behind paywalls or focus on specific diets, NutriSnap gives you complete control over what you track.

## Features

- **📸 OCR Scanning**: Take a photo of any nutrition label and automatically extract the data
- **📊 Custom Tracking**: Track calories, sodium, saturated fats, protein, carbs, and more
- **🍽️ Meal Planner**: Build meals by combining multiple products with custom serving sizes
- **📈 History**: View your nutrition history over time
- **🔒 Privacy First**: All data stored locally on your device
- **💸 Free & Open Source**: No ads, no subscriptions, no tracking

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tesseract.js** - Client-side OCR
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/satoriagent01/nutrisnap-2.git
cd nutrisnap-2

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
npm run build
```

## How to Use

### Scanning a Nutrition Label

1. Go to the **Scan** tab
2. Take a photo or upload an image of a nutrition facts label
3. Review and edit the extracted data
4. Save the product to your library

### Creating a Meal

1. Go to the **Meal Planner** tab
2. Click **New Meal**
3. Add products from your scanned library
4. Adjust serving sizes (grams) for each item
5. Save the meal

### Viewing History

1. Go to the **History** tab
2. See your past meals and their nutritional breakdown

## What's Not Done Yet

- [ ] Cloud sync between devices
- [ ] Food database integration
- [ ] Barcode scanning
- [ ] Export data (CSV, PDF)
- [ ] Dark mode
- [ ] PWA support
- [ ] More granular nutrient tracking (vitamins, minerals)

## License

MIT License - feel free to use this for personal or commercial projects.
