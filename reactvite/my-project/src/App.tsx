import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import ContactPage from "./pages/ContactPage"; // Yeni
import ReferencesPage from "./pages/ReferencesPage";
// import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <>
      {/* <ScrollToTop /> */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anasayfa" element={<Home />} />
        
        <Route path="/hakkimizda" element={<AboutUs />} />
        
        <Route path="/urunler" element={<ProductsPage />} />
        <Route path="/urunler/:id" element={<ProductDetail />} />

        <Route path="/hizmetler" element={<ServicesPage />} />
        <Route path="/hizmetler/:id" element={<ServiceDetail />} />
        <Route path="/referanslar" element={<ReferencesPage />} />

        {/* İletişim Sayfası */}
        <Route path="/iletisim" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default App;