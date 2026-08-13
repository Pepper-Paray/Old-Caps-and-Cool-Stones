import { useState } from "react";

export default function ItemForm({ onAdd }) {
  const [form, setForm] = useState({
    type: "",
    brand: "",
    feel: "",
    size: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Send only the fields that matter for the chosen type
    const newItem =
      form.type === "Cap"
        ? {
            type: form.type,
            brand: form.brand,
            size: Number(form.size),
          }
        : {
            type: form.type,
            feel: form.feel,
            size: Number(form.size),
          };

    await onAdd(newItem.feel, newItem.type, newItem.size, newItem.brand);

    // Reset form
    setForm({
      type: "",
      brand: "",
      feel: "",
      size: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form-wrapper">
      <label>
        Type:
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select type</option>
          <option value="Cap">Cap</option>
          <option value="Stone">Stone</option>
        </select>
      </label>

      {form.type === "Cap" && (
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
          />
        </label>
      )}

      {form.type === "Stone" && (
        <label>
          Feel:
          <input
            type="text"
            name="feel"
            value={form.feel}
            onChange={handleChange}
            required
          />
        </label>
      )}

      <label>
        Size:
        <input
          type="number"
          name="size"
          value={form.size}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="button">Add Item</button>
    </form>
  );
}

