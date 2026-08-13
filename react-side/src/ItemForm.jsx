import { useState } from "react";

export default function ItemForm({ onAdd }) {
  const [form, setForm] = useState({
    table: "",   // Cap or Stone
    type: "",    // typed text
    brand: "",
    feel: "",
    size: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Build item based on selected table
    const newItem =
      form.table === "Cap"
        ? {
            type: form.type,     // typed text
            brand: form.brand,
            size: Number(form.size),
          }
        : {
            type: form.type,     // typed text
            feel: form.feel,
            size: Number(form.size),
          };

    // Send to parent
    await onAdd(newItem.feel, newItem.type, newItem.size, newItem.brand);

    // Reset form
    setForm({
      table: "",
      type: "",
      brand: "",
      feel: "",
      size: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form-wrapper">

      {/* Select table */}
      <label>
        Add To:
        <select name="table" value={form.table} onChange={handleChange} required>
          <option value="">Choose one</option>
          <option value="Cap">Caps</option>
          <option value="Stone">Stones</option>
        </select>
      </label>

      {/* Type is typed manually */}
      {form.table && (
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder={
              form.table === "Cap"
                ? "hook, velcro, snapback..."
                : "granite, quartz, river rock..."
            }
            required
          />
        </label>
      )}

      {/* Brand only for Caps */}
      {form.table === "Cap" && (
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

      {/* Feel only for Stones */}
      {form.table === "Stone" && (
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

      {/* Size for both */}
      {form.table && (
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
      )}

      <button type="submit" className="button">Add Item</button>
    </form>
  );
}

