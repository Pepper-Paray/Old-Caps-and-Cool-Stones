import { useEffect, useState } from "react";
import { getItems, addItem } from "./api";
import ItemForm from "./ItemForm";

export default function CollectionPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItems();
    }, []);

    async function loadItems() {
        const data = await getItems();
        setItems(data);
    }

    async function handleAdd(newItem) {
        await addItem(newItem);
        loadItems();
    }

    return (
        <div style={{ padding: "20px" }}>
            <ItemForm onAdd={handleAdd} />

            <h2>Your Caps & Stones Collection</h2>

            {items.map(item => (
                <div 
                    key={item.random_id} 
                    style={{ 
                        marginBottom: "20px", 
                        padding: "10px", 
                        border: "1px solid #ccc",
                        borderRadius: "8px"
                    }}
                >
                    <strong style={{ fontSize: "18px" }}>
                        {item.type} {/* Cap or Stone */}
                    </strong>

                    <div>Brand: {item.brand}</div>
                    <div>Color: {item.color}</div>
                    <div>Size: {item.size}</div>
                    <div>Feel: {item.feel}</div>

                    {/* Optional fields depending on item type */}
                    {item.type === "Cap" && (
                        <div>Cap Style: {item.cap_style}</div>
                    )}

                    {item.type === "Stone" && (
                        <div>Stone Type: {item.stone_type}</div>
                    )}

                    {/* Image */}
                    {item.image_url && (
                        <img 
                            src={item.image_url} 
                            alt={item.type} 
                            style={{ width: "150px", marginTop: "10px" }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
