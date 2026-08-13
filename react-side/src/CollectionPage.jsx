import { useEffect, useState } from "react";
import { loadItems, addItem } from "./api";
import ItemForm from "./ItemForm";

export default function CollectionPage() {
  const [items, setItems] = useState([]);
 
  async function fetchItems() {
  const all = await loadItems();
  setItems(all);

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleAdd(newItem) {
    await addItem(newItem);
    fetchItems();
  }

  return (
    <div className="app-container">
      <h1>Caps & Stones Collection</h1>

      <ItemForm onAdd={handleAdd} />

      <h2>Your Items</h2>

      {items.map((item) => (
        <div key={item.random_id} className="item-card">
          <strong>{item.type}</strong>
          <div>Brand: {item.brand}</div>
          <div>Color: {item.color}</div>
          <div>Size: {item.size}</div>
          <div>Feel: {item.feel}</div>
          {item.type === "Cap" && <div>Cap Style: {item.cap_style}</div>}
          {item.type === "Stone" && <div>Stone Type: {item.stone_type}</div>}
          {item.image_url && <img src={item.image_url} alt={item.type} />}
        </div>
      ))}
    </div>
  );
}
 }
