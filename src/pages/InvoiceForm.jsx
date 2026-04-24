import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "../context/InvoiceContext";

function InvoiceForm() {
  const { addInvoice } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    client: "",
    amount: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // prevent empty submissions
    if (!form.id || !form.client || !form.amount) return;

    addInvoice(form);

    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Invoice</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="id"
          placeholder="Invoice ID"
          value={form.id}
          onChange={handleChange}
        />

        <input
          name="client"
          placeholder="Client name"
          value={form.client}
          onChange={handleChange}
        />

        <input
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>

        <button type="submit">Add Invoice</button>
      </form>
    </div>
  );
}

export default InvoiceForm;