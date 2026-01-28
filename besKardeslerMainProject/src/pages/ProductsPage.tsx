import Header from "../sections/Header";
import PageTitle from "../components/PageTitle";
import ProductGrid from "../sections/ProductGrid"; // Yeni eklediğimiz parça
import Footer from "../sections/Footer";
import BotBar from "../sections/BotBar";

const ProductsPage = () => {
  return (
    <main className="w-full min-h-screen relative bg-white font-sans">
      
      <Header />

      <PageTitle 
        title="ÜRÜNLER" 
        breadcrumbs={[
            { label: "Ana Sayfa", url: "/" },
            { label: "ÜRÜNLER" }
        ]}
      />

      {/* Ürün Listesi Buraya Geliyor */}
      <ProductGrid />

      <Footer />
      <BotBar />

    </main>
  );
};

export default ProductsPage;