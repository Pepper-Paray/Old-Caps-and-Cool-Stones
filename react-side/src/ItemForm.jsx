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
            random_id: crypto.randomUUID()
        };

        onAdd(itemToAdd);

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
        <form onSubmit={handleSubmit} className="form-wrapper">
            <label>
                Type:
                <select name="type" value={form.type} onChange={handleChange}>
                    <option value="Cap">Cap</option>
                    <option value="Stone">Stone</option>
                </select>
            </label>

            <label>
                Brand:
                <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                />
            </label>

            <label>
                Color:
                <input
                    type="text"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                />
            </label>

            <label>
                Size:
                <input
                    type="text"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                />
            </label>

            <label>
                Feel:
                <input
                    type="text"
                    name="feel"
                    value={form.feel}
                    onChange={handleChange}
                />
            </label>

            {form.type === "Cap" && (
                <label>
                    Cap Style:
                    <input
                        type="text"
                        name="cap_style"
                        value={form.cap_style}
                        onChange={handleChange}
                    />
                </label>
            )}

            {form.type === "Stone" && (
                <label>
                    Stone Type:
                    <input
                        type="text"
                        name="stone_type"
                        value={form.stone_type}
                        onChange={handleChange}
                    />
                </label>
            )}


            <button type="submit" className="button">Add Item</button>
        </form>
    );
}
