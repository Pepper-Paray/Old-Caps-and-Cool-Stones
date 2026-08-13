import { useEffect, useState } from "react";
import { getItems, addItem } from "./apis";
import ItemForm from "./ItemForm";

export default function CollectionPage() {
  const [items, setItems] = useState([]);

  // Load items from Flask when page loads
  async function fetchItems() {
    const data = await getItems();
    setItems(data.items || []);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  // Called when ItemForm submits
  async function handleAdd(feel, type, size, brand) {
    await addItem(feel, type, size, brand);
    fetchItems(); // refresh list
  }

  return (
    <div className="app-container">
      <h1>Caps & Stones Collection</h1>

      <ItemForm onAdd={handleAdd} />

      <h2>Your Items</h2>

      {items.map((item) => (
        <div key={item.id} className="item-card">
          <strong>ID:</strong> {item.id}
          <br />

          <strong>Type:</strong> {item.type}
          <br />

          {item.type === "Cap" && (
            <div><strong>Brand:</strong> {item.brand}</div>
          )}

          {item.type === "Stone" && (
            <div><strong>Feel:</strong> {item.feel}</div>
          )}

          <div><strong>Size:</strong> {item.size}</div>
        </div>
      ))}
    </div>
  );
}

