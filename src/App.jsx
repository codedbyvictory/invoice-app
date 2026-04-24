import { Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList";
import EditInvoice from "./pages/EditInvoice";
import InvoiceForm from "./pages/InvoiceForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InvoiceList />} />
      <Route path="/edit/:id" element={<EditInvoice />} />
      <Route path="/new" element={<InvoiceForm />} />
    </Routes>
  );
}

export default App;