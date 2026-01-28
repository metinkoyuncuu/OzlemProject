import Header from "../sections/Header";
import Hero from "../sections/Hero";
import Intro from "../sections/Intro";
import Services from "../sections/Services";
import About from "../sections/About";
// import Products from "../sections/Products"; // Eski ürünler kapalı
// import Projects from "../sections/Projects"; // Eski projeler kapalı
import BrandSlider from "../sections/BrandSlider"; // <-- YENİ BİLEŞENİ İMPORT ET
import ContactMap from "../sections/ContactMap";
import Footer from "../sections/Footer";
import BotBar from "../sections/BotBar";

const Home = () => {
  return (
    <main className="w-full min-h-screen relative bg-white font-sans">
      <Header />
      <Hero />
      <Intro />
      <Services />
      
      {/* Hakkımızda Bölümü */}
      <About />
      
      {/* YENİ REFERANS SLIDER'I (About ile ContactMap arasında) */}
      <BrandSlider />

      <ContactMap />
      <Footer />
      <BotBar />
    </main>
  );
};

export default Home;