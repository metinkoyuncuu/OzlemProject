import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    image: "/uzaktan-bina-ykm-makinas-p47b8hoih6j38947rj68f3l8fmhej634700rh00z8w.jpg",
    title: "Bina Yıkım ve Enkaz Kaldırma",
    subtitle: "Yıkım, hafriyat ve nakliyat işlerini büyük bir titizlikle yürütüyoruz."
  },
  {
    id: 2,
    image: "/iskandinav-tarzi-ev-dekorasyonu-ornekleri-p47blr6ix0or25umb9kplr3e7d3v5eqrcnff9kczg0.jpg",
    title: "Dekorasyon ve Tasarım",
    subtitle: "Lüks ve modern tasarımlarla yaşam ortamınızın kalitesini artırıyoruz."
  },
  {
    id: 3,
    image: "/manset-1-p46m767t48oyh2bytxktijleakytnjwxlvzh18f5o0.jpg",
    title: "İnşaat ve Proje İşleri",
    subtitle: "Avm, oteller, hastaneler ve yaşam alanlarının mimarıyız."
  },
  {
    id: 4,
    image: "/kartal-1024x404-1-p47bbgu44alrzsskdthpbcjs5jt8wnwilqe46jm3jk.jpg",
    title: "Nakliye ve Taşımacılık",
    subtitle: "Geniş araç filosu ve tecrübeli kadro ile güvenli taşıma."
  },
  {
    id: 5,
    image: "/molozhafriyat-p47c1juvrsb868wl2le009l9lh8xiagd6u46lyxsvk.jpg",
    title: "Moloz ve Hafriyat Dökümü",
    subtitle: "İnşaat atıklarınızı, moloz ve hafriyatlarınızı çuvallı çuvalsız alıyoruz."
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // --- OTOMATİK GEÇİŞ (AUTOPLAY) ---
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    }, 5000); // 5 saniye

    return () => clearInterval(slideInterval);
  }, []);

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Linke tıklamayı engelle
    e.stopPropagation();
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[750px] bg-gray-900 overflow-hidden group">
      
      {/* Tıklayınca Hizmetlere Giden Link Kapsayıcısı */}
      <Link to="/hizmetler" className="block w-full h-full relative">
        
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            // İŞTE SİHİR BURADA:
            // Tüm slaytlar "absolute" ile üst üste biner.
            // Sadece aktif olanın opacity'si 1 olur, diğerleri 0.
            // transition-opacity sayesinde yazı ve resim BERABER solar/belirir.
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Arkaplan Resmi */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Karartma (Overlay) */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Yazı İçeriği */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pt-10">
              <h2 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              
              <div className="bg-black/50 px-6 py-2 md:px-12 md:py-3 backdrop-blur-sm rounded-sm">
                 <p className="text-sm md:text-xl font-light tracking-wide text-gray-100 drop-shadow-md">
                    {slide.subtitle}
                 </p>
              </div>
            </div>
          </div>
        ))}

      </Link>

      {/* OKLAR (Z-Index yüksek olmalı ki tıklanabilsin) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-theme-blue transition backdrop-blur-sm border border-white/20"
      >
        <FaChevronLeft size={20} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-theme-blue transition backdrop-blur-sm border border-white/20"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Alt Noktalar (Dots) - Opsiyonel Şıklık */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
            <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${idx === current ? "bg-white w-6" : "bg-white/50"}`}
            ></div>
        ))}
      </div>

    </section>
  );
};

export default Hero;