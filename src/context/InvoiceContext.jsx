import { createContext, useEffect, useState } from "react";

export const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState(() => {
    const stored = localStorage.getItem("invoices");
    return stored
      ? JSON.parse(stored)
      : [
          { id: "RT3080", client: "Jensen Huang", amount: 1800, status: "paid" },
          { id: "XM9141", client: "Elon Musk", amount: 2450, status: "pending" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (invoice) => {
    setInvoices((prev) => [...prev, invoice]);
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const markAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: "paid" } : inv
      )
    );
  };

  const editInvoice = (id, updatedData) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, ...updatedData } : inv
      )
    );
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        addInvoice,
        deleteInvoice,
        markAsPaid,
        editInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}