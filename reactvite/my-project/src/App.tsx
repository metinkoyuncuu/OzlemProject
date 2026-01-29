import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import ContactPage from "./pages/ContactPage"; 
import ReferencesPage from "./pages/ReferencesPage";
import FloatingCallButton from "./components/FloatingCallButton"; // <-- 1. IMPORT ET

function App() {
  return (
    <>
      {/* ScrollToTop varsa kalabilir */}
      {/* <ScrollToTop /> */}
      
      {/* 2. BUTONU BURAYA KOY (Routes'un dışında) */}
      <FloatingCallButton />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anasayfa" element={<Home />} />
        
        <Route path="/hakkimizda" element={<AboutUs />} />
        
        <Route path="/urunler" element={<ProductsPage />} />
        <Route path="/urunler/:id" element={<ProductDetail />} />

        <Route path="/hizmetler" element={<ServicesPage />} />
        <Route path="/hizmetler/:id" element={<ServiceDetail />} />
        <Route path="/referanslar" element={<ReferencesPage />} />

        <Route path="/iletisim" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default App;