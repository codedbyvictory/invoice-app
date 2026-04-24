import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InvoiceContext } from "../context/InvoiceContext";

function EditInvoice() {
  const { id } = useParams();
  const { invoices, editInvoice } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) return <h3>Invoice not found</h3>;

  const [form, setForm] = useState({
    client: invoice.client,
    amount: invoice.amount,
    status: invoice.status,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editInvoice(id, form);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Invoice</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="client"
          value={form.client}
          onChange={handleChange}
        />

        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditInvoice;