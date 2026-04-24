import { useNavigate } from "react-router-dom";

function InvoiceCard({ invoice }) {
  const navigate = useNavigate();

  const getStatusColor = () => {
    if (invoice.status === "paid") return "#33d69f";
    if (invoice.status === "pending") return "#ff8f00";
    return "#888";
  };

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/edit/${invoice.id}`)}   // ✅ ADDED HERE
    >
      <div style={styles.left}>
        <p><strong>#{invoice.id}</strong></p>
        <p>{invoice.client}</p>
      </div>

      <div style={styles.right}>
        <p>${invoice.amount}</p>

        <span
          style={{
            ...styles.status,
            background: getStatusColor() + "20",
            color: getStatusColor(),
          }}
        >
          {invoice.status}
        </span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#1e2139",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  right: {
    textAlign: "right",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
};

export default InvoiceCard;