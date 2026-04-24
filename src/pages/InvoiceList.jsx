import { useContext, useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import { useNavigate } from "react-router-dom";

function InvoiceList() {
  const { invoices, deleteInvoice } = useContext(InvoiceContext);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const filteredInvoices = invoices
    .filter((inv) => {
      if (filter === "all") return true;
      return inv.status === filter;
    })
    .filter((inv) =>
      inv.client.toLowerCase().includes(search.toLowerCase())
    );

  const getStatusStyle = (status) => {
    if (status === "paid") return { background: "#d1fae5", color: "#065f46" };
    if (status === "pending") return { background: "#fef3c7", color: "#92400e" };
    return { background: "#e5e7eb", color: "#374151" };
  };

  return (
    <div
      style={{
        ...styles.container,
        background: darkMode ? "#0f172a" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0 }}>Invoices</h1>
          <p style={{ margin: 0, color: darkMode ? "#ccc" : "gray" }}>
            {invoices.length} total invoices
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              ...styles.toggleBtn,
              background: darkMode ? "#1e293b" : "#e5e7eb",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* NEW INVOICE */}
          <button
            onClick={() => navigate("/new")}
            style={styles.newBtn}
          >
            + New Invoice
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div style={styles.controls}>
        <input
          placeholder="Search client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            ...styles.input,
            background: darkMode ? "#1e293b" : "#fff",
            color: darkMode ? "#fff" : "#000",
            border: darkMode ? "1px solid #334155" : "1px solid #ddd",
          }}
        />

        <div style={styles.filters}>
          <button onClick={() => setFilter("all")} style={styles.filterBtn}>All</button>
          <button onClick={() => setFilter("paid")} style={styles.filterBtn}>Paid</button>
          <button onClick={() => setFilter("pending")} style={styles.filterBtn}>Pending</button>
        </div>
      </div>

      {/* LIST */}
      <div style={{ marginTop: "20px" }}>
        {filteredInvoices.length === 0 ? (
          <p style={{ color: darkMode ? "#aaa" : "gray" }}>
            No invoices found
          </p>
        ) : (
          filteredInvoices.map((inv) => (
            <div
              key={inv.id}
              onClick={() => navigate(`/edit/${inv.id}`)}
              style={{
                ...styles.card,
                background: darkMode ? "#1e293b" : "#fff",
                border: darkMode ? "1px solid #334155" : "1px solid #eee",
              }}
            >
              <div>
                <p style={styles.id}>#{inv.id}</p>
                <p style={{ margin: 0, color: darkMode ? "#ccc" : "gray" }}>
                  {inv.client}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0 }}>${inv.amount}</p>

                <span
                  style={{
                    ...styles.status,
                    ...getStatusStyle(inv.status),
                  }}
                >
                  {inv.status}
                </span>

                <div style={{ marginTop: "8px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${inv.id}`);
                    }}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteInvoice(inv.id);
                    }}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    minHeight: "100vh",
    transition: "0.3s",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  newBtn: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  toggleBtn: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  controls: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
  },

  filters: {
    display: "flex",
    gap: "10px",
  },

  filterBtn: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    background: "white",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "0.2s",
  },

  id: {
    margin: 0,
    fontWeight: "bold",
  },

  status: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    display: "inline-block",
    marginTop: "5px",
  },

  editBtn: {
    marginRight: "5px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    background: "#e0e7ff",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    background: "#fee2e2",
    color: "#b91c1c",
    cursor: "pointer",
  },
};

export default InvoiceList;