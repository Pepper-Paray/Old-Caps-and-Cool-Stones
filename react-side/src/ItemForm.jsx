import { useState } from "react";

export default function ItemForm({ onAdd }) {
    const [form, setForm] = useState({
        type: "Cap",
        brand: "",
        color: "",
        size: "",
        feel: "",
        cap_style: "",
        stone_type: "",
        image_url: ""
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const itemToAdd = {
            ...form,
            random_id: crypto.randomUUID()  // generate unique ID
        };

        onAdd(itemToAdd);

        // Reset form
        setForm({
            type: "Cap",
            brand: "",
            color: "",
            size: "",
            feel: "",
            cap_style: "",
            stone_type: "",
            image_url: ""
        });
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            
            {/* Type */}
            <label>
                Type:
                <select name="type" value={form.type} onChange={handleChange}>
                    <option value="Cap">Cap</option>
                    <option value="Stone">Stone</option>
                </select>
            </label>

            <br />

            {/* Brand */}
            <label>
                Brand:
                <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                />
            </label>

            <br />

            {/* Color */}
            <label>
                Color:
                <input
                    type="text"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                />
            </label>

            <br />

            {/* Size */}
            <label>
                Size:
                <input
                    type="text"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                />
            </label>

            <br />

            {/* Feel */}
            <label>
                Feel:
                <input
                    type="text"
                    name="feel"
                    value={form.feel}
                    onChange={handleChange}
                />
            </label>

            <br />

            {/* Cap-only field */}
            {form.type === "Cap" && (
                <>
                    <label>
                        Cap Style:
                        <input
                            type="text"
                            name="cap_style"
                            value={form.cap_style}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                </>
            )}

            {/* Stone-only field */}
            {form.type === "Stone" && (
                <>
                    <label>
                        Stone Type:
                        <input
                            type="text"
                            name="stone_type"
                            value={form.stone_type}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                </>
            )}

            {/* Image URL */}
            <label>
                Image URL:
                <input
                    type="text"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                />
            </label>

            <br />

            <button type="submit">Add Item</button>
        </form>
    );
}
