import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Ürün Verileri (Örnek olarak 6 ürün ekledim)
const products = [
  { id: 1, title: "Örnek Ürün 7", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070" }, // Villa / Ev
  { id: 2, title: "Örnek Ürün 8", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068" }, // Mutfak
  { id: 3, title: "Örnek Ürün 9", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" }, // Modern Bina
  { id: 4, title: "Örnek Ürün 10", image: "https://images.unsplash.com/photo-1484154218962-a1c002085aac?q=80&w=2070" }, // İç Mekan
  { id: 5, title: "Örnek Ürün 11", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070" }, // Rezidans
  { id: 6, title: "Örnek Ürün 12", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070" }, // Salon
];

const Products = () => {
  // Slider'ın başlangıç indeksi
  const [startIndex, setStartIndex] = useState(0);
  // Ekranda kaç ürün görünecek (Masaüstü için 2 varsaydık, responsive ile yöneteceğiz)
  const [itemsPerPage, setItemsPerPage] = useState(2);

  // Ekran boyutuna göre gösterilecek ürün sayısını güncelle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Mobilde 1 ürün
      } else {
        setItemsPerPage(2); // Masaüstünde 2 ürün
      }
    };
    
    // İlk yüklemede ve resize'da çalıştır
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // SONRAKİ SAYFA (Döngüsel)
  const nextSlide = () => {
    setStartIndex((prevIndex) => {
        // Eğer sona geldiysek başa sar
        if (prevIndex + itemsPerPage >= products.length) {
            return 0;
        }
        return prevIndex + 1;
    });
  };

  // ÖNCEKİ SAYFA (Döngüsel)
  const prevSlide = () => {
    setStartIndex((prevIndex) => {
        // Eğer baştaysak sona sar
        if (prevIndex === 0) {
            return products.length - itemsPerPage; 
        }
        return prevIndex - 1;
    });
  };

  // Şu an ekranda görünecek dilimi al
  // Dizinin sonuna gelince hata vermemesi için mantık:
  // Basitçe `slice` kullanıyoruz ama döngüsel hissi vermek için slider mantığı genelde index kaydırır.
  // Burada görseldeki gibi "Sayfa Sayfa" değil "Kayarak" gitmesini sağladım.
  
  // Görüntülenecek ürünleri hesapla (Wrap around mantığı ile)
  // Örneğin 5 ürün var, 2 gösteriyoruz. Index 4'te ise 4 ve 0'ı göstermeli.
  const visibleProducts = [];
  for (let i = 0; i < itemsPerPage; i++) {
      const index = (startIndex + i) % products.length; // Modulo operatörü ile döngü
      visibleProducts.push(products[index]);
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto max-w-[1140px] px-4">
        
        {/* --- BAŞLIK ALANI (Hizmetler ile aynı stil) --- */}
        <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[3px] bg-theme-blue"></div>
            <h3 className="text-xl font-bold text-theme-blue uppercase tracking-wide">
                ÜRÜNLER
            </h3>
            <div className="flex-1 h-[1px] bg-theme-blue/30"></div>
        </div>

        {/* --- SLIDER ALANI --- */}
        <div className="flex items-center gap-4 md:gap-8">
            
            {/* SOL OK BUTTON */}
            <button 
                onClick={prevSlide}
                className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-theme-blue text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors shadow-lg cursor-pointer"
            >
                <FaArrowLeft className="text-sm md:text-lg" />
            </button>

            {/* KARTLAR CONTAINER */}
            <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ease-in-out">
                    {visibleProducts.map((item) => (
                        <div key={`${item.id}-${startIndex}`} className="relative h-[250px] md:h-[300px] rounded-[30px] overflow-hidden group shadow-md animate-fade-in">
                            {/* Arkaplan Resmi */}
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            
                            {/* Overlay (Yazı okunabilirliği için altta siyah gölge) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                            {/* Ürün Başlığı (Sol Alt Köşe) */}
                            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                                <h4 className="text-white text-lg md:text-xl font-bold tracking-wide">
                                    {item.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SAĞ OK BUTTON */}
            <button 
                onClick={nextSlide}
                className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-theme-blue text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors shadow-lg cursor-pointer"
            >
                <FaArrowRight className="text-sm md:text-lg" />
            </button>

        </div>

      </div>
    </section>
  );
};

export default Products;