import Header from "../sections/Header";
import PageTitle from "../components/PageTitle";
import AboutDetail from "../sections/AboutDetail"; // Yeni oluşturduğumuz parça
import Footer from "../sections/Footer";
import BotBar from "../sections/BotBar";

const AboutUs = () => {
  return (
    <main className="w-full min-h-screen relative bg-white font-sans">
      
      {/* 1. Header (Sabit) */}
      <Header />

      {/* 2. Sayfa Başlığı (Mavi Alan) */}
      <PageTitle 
        title="Hakkımızda" 
        breadcrumbs={[
            { label: "Ana Sayfa", url: "/" },
            { label: "HAKKIMIZDA", url: "/hakkimizda" },
            { label: "Biz Kimiz" }
        ]}
      />

      {/* 3. İçerik Alanı (Yeni Yazdığımız Beyaz Kutu) */}
      <AboutDetail />

      {/* 4. Footer ve Alt Bar (Sabit) */}
      <Footer />
      <BotBar />
      
    </main>
  );
};

export default AboutUs;