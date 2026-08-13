export const API_URL = "https://old-caps-and-cool-stones.onrender.com";

// Fetch caps only
export async function getCaps() {
  const res = await fetch(`${API_URL}/Caps`);
  return res.json();
}

// Fetch stones only
export async function getStones() {
  const res = await fetch(`${API_URL}/Stones`);
  return res.json();
}

// Add either a cap or a stone
export async function addItem(item) {
  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
  return res.json();
}

// NEW: Unified getter for all items
export async function getItems() {
  const caps = await getCaps();
  const stones = await getStones();
  return [...caps, ...stones];
}

// Legacy name (still works)
export async function loadItems() {
  return getItems();
}


