export const API_URL = "https://old-caps-and-cool-stones.onrender.com";

export async function getCaps() {
    const res = await fetch(`${API_URL}/Caps`);
    return res.json();
}

export async function getStones() {
    const res = await fetch(`${API_URL}/Stones`);
    return res.json();
}

export async function addItem(item) {
    const res = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });
    return res.json();
}

export async function loadItems() {
    const caps = await getCaps();
    const stones = await getStones();
    return [...caps, ...stones];
}

