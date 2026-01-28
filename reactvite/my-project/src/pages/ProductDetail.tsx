import { useState } from "react";
import { useParams } from "react-router-dom";
import {  FaThumbsUp, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Ok ikonlarını ve çarpıyı ekledik
import { FaXTwitter } from "react-icons/fa6";
import Header from "../sections/Header";
import PageTitle from "../components/PageTitle";
import Footer from "../sections/Footer";
import BotBar from "../sections/BotBar";

// --- SAHTE VERİTABANI (MOCK DATA) ---
const productDatabase = [
  {
    id: 1,
    title: "Örnek Ürün 1 - Çalışma Odası",
    description: "Bu çalışma odası takımı, modern ve ergonomik tasarımıyla ofisinizde veya evinizde konforlu bir çalışma alanı sunar.",
    gallery: [
       "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070",
       "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1935",
       "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
    ]
  },
  {
    id: 2,
    title: "Örnek Ürün 2 - Çatı Katı",
    description: "Geniş ve ferah çatı katı tasarımlarımızla gökyüzüne daha yakın olun.",
    gallery: [
       "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069",
       "https://images.unsplash.com/photo-1502005229762-cf1afd38088d?q=80&w=2070",
       "https://images.unsplash.com/photo-1484154218962-a1c002085aac?q=80&w=2070",
       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070"
    ]
  },
  // Diğer ürünler...
];

const ProductDetail = () => {
  const { id } = useParams();
  
  // -- LIGHTBOX İÇİN STATE AYARLARI --
  const [isOpen, setIsOpen] = useState(false); // Galeri açık mı?
  const [photoIndex, setPhotoIndex] = useState(0); // Hangi fotoğraftayız?

  const productId = Number(id);
  const product = productDatabase.find(p => p.id === productId);

  const displayTitle = product ? product.title : `Örnek Ürün ${id}`;
  const displayDesc = product ? product.description : "Detaylı açıklama bulunamadı.";
  const displayGallery = product ? product.gallery : [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070",
    "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2068",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
  ];

  // Galeriyi açan fonksiyon
  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
    // Arkadaki sayfanın kaymasını engelle
    document.body.style.overflow = 'hidden';
  };

  // Galeriyi kapatan fonksiyon
  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; // Kaydırmayı geri aç
  };

  // Sonraki Resim
  const nextSrc = () => {
    setPhotoIndex((prevIndex) => (prevIndex + 1) % displayGallery.length);
  };

  // Önceki Resim
  const prevSrc = () => {
    setPhotoIndex((prevIndex) => (prevIndex + displayGallery.length - 1) % displayGallery.length);
  };

  return (
    <main className="w-full min-h-screen relative bg-white font-sans">
      
      <Header />

      <PageTitle 
        title={displayTitle} 
        breadcrumbs={[
            { label: "Ana Sayfa", url: "/" },
            { label: "ÜRÜNLER", url: "/urunler" },
            { label: "Örnek Ürün Alt Kategorisi 1" },
            { label: displayTitle }
        ]}
      />

      <div className="container mx-auto max-w-[1140px] px-4 py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 border border-gray-100">
            
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{displayTitle}</h2>
                <p className="text-gray-600 leading-relaxed font-light text-[15px]">{displayDesc}</p>
            </div>

            {/* --- KÜÇÜK RESİMLER (Grid) --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {displayGallery.map((img, index) => (
                    <div 
                        key={index} 
                        onClick={() => openLightbox(index)} // Tıklayınca açılacak
                        className="aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative"
                    >
                        <img 
                            src={img} 
                            alt={`Görsel ${index + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Büyüteç ikonu (Hoverda çıkar) */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">Büyüt</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full h-[1px] bg-gray-100 my-6"></div>

            <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-[4px] text-xs font-bold hover:opacity-80 transition"><FaXTwitter /> <span>Gönder</span></button>
                <button className="flex items-center gap-1 bg-[#1877F2] text-white px-3 py-1 rounded-[4px] text-xs font-bold hover:bg-blue-700 transition"><FaThumbsUp /> <span>Beğen</span></button>
                <button className="flex items-center gap-1 bg-[#1877F2] text-white px-3 py-1 rounded-[4px] text-xs font-bold hover:bg-blue-700 transition"><span>Paylaş</span></button>
            </div>

        </div>
      </div>

      <Footer />
      <BotBar />

      {/* --- TAM EKRAN LIGHTBOX (MODAL) --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-fade-in">
            
            {/* Kapat Butonu (Sağ Üst) */}
            <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-full transition-all z-50"
            >
                <FaTimes size={24} />
            </button>

            {/* Sol Ok */}
            <button 
                onClick={(e) => { e.stopPropagation(); prevSrc(); }}
                className="absolute left-2 md:left-8 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-2 md:p-4 rounded-full transition-all z-50"
            >
                <FaChevronLeft size={24} />
            </button>

            {/* BÜYÜK RESİM */}
            <div className="w-full h-full p-4 md:p-10 flex items-center justify-center">
                <img 
                    src={displayGallery[photoIndex]} 
                    alt="Büyük Görsel" 
                    className="max-h-full max-w-full object-contain rounded-md shadow-2xl animate-scale-in"
                />
            </div>

            {/* Sağ Ok */}
            <button 
                onClick={(e) => { e.stopPropagation(); nextSrc(); }}
                className="absolute right-2 md:right-8 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-2 md:p-4 rounded-full transition-all z-50"
            >
                <FaChevronRight size={24} />
            </button>

            {/* Resim Sayacı (Alt) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-mono text-sm bg-black/40 px-3 py-1 rounded-full">
                {photoIndex + 1} / {displayGallery.length}
            </div>

        </div>
      )}

    </main>
  );
};

export default ProductDetail;