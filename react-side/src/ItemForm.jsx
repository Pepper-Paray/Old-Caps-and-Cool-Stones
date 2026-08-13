import { useState } from "react";
import { addItem } from "../apis";

export default function ItemForm() {
  const [form, setForm] = useState({
    type: "",
    feel: "",
    size: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await addItem(form.feel, form.type, form.size);

    console.log("Flask response:", data);

    setForm({
      type: "",
      feel: "",
      size: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form-wrapper">
      <label>
        Type:
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="">Select type</option>
          <option value="Cap">Cap</option>
          <option value="Stone">Stone</option>
        </select>
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

      <label>
        Size:
        <input
          type="number"
          name="size"
          value={form.size}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className="button">Add Item</button>
    </form>
  );
}

