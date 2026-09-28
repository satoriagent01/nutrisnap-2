const STORAGE_KEY = 'nutrisnap_data';

export function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return {
    products: [],
    meals: [],
    history: [],
  };
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addProduct(product) {
  const data = loadData();
  const newProduct = { ...product, id: Date.now().toString() };
  data.products.push(newProduct);
  saveData(data);
  return newProduct;
}

export function addMeal(meal) {
  const data = loadData();
  const newMeal = { ...meal, id: Date.now().toString(), date: new Date().toISOString() };
  data.meals.push(newMeal);
  saveData(data);
  return newMeal;
}

export function getHistory() {
  const data = loadData();
  return data.history.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function addHistoryEntry(entry) {
  const data = loadData();
  data.history.push({ ...entry, date: new Date().toISOString() });
  saveData(data);
}
