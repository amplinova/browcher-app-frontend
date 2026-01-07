import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";
import Restaurant from "./pages/OurProducts/Restaurant";
import Amplinova from "./pages/OurClients/Amplinova";
import Clients from "./pages/Clients";
import Products from "./pages/Products";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/OurProducts/Restaurant" element={<Restaurant />} />
              <Route path="/Clients" element={<Clients />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products/:slug" element={<Restaurant />} />
              <Route path="/clients/:slug" element={<Amplinova />} />

            </Routes>
          </main>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
