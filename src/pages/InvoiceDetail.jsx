import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(InvoiceContext);

  // safety check
  if (!context) {
    return <p>Context not found</p>;
  }

  const { invoices, markAsPaid, deleteInvoice } = context;

  const invoice = invoices.find((inv) => inv.id === id);

  // VERY IMPORTANT
  if (!invoice) {
    return <p>Invoice not found</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>← Go Back</button>

      <h1>Invoice #{invoice.id}</h1>
      <p><strong>Client:</strong> {invoice.client}</p>
      <p><strong>Amount:</strong> ${invoice.amount}</p>
      <p><strong>Status:</strong> {invoice.status}</p>

      <br />

      <button onClick={() => markAsPaid(invoice.id)}>
        Mark as Paid
      </button>

      <button
        onClick={() => {
          deleteInvoice(invoice.id);
          navigate("/");
        }}
        style={{ marginLeft: "10px", color: "red" }}
      >
        Delete
      </button>
    </div>
  );
}

export default InvoiceDetail;