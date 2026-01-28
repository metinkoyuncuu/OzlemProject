import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

// Slider için Resim Listesi
const aboutImages = [
  "/WhatsApp Image 2026-01-28 at 20.57.45.jpeg", 
  "/zenci.jpeg", 
  "/biri.jpeg"
];

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Otomatik Geçiş Ayarı
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === aboutImages.length - 1 ? 0 : prev + 1));
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-[1140px] px-4">
        
        {/* İki Sütunlu Yapı */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            
            {/* --- SOL TARAF: SLIDER (GÖRSEL) --- */}
            {/* Arka plan rengini (bg-gray-100) boşluk kalırsa sırıtmaması için ekledim */}
            <div className="relative w-full md:w-[550px] h-[300px] md:h-[380px] rounded-[30px] overflow-hidden shadow-lg group bg-gray-50">
                
                {/* Resimler Döngüsü */}
                {aboutImages.map((img, index) => (
                    <div 
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {/* DEĞİŞİKLİK BURADA: object-cover yerine object-contain yaptık */}
                        <img 
                            src={img} 
                            alt={`Kurumsal ${index + 1}`} 
                            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-[2000ms]"
                        />
                    </div>
                ))}

                {/* Alt Kısım Noktaları (Dots) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {aboutImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${
                                idx === currentSlide ? "bg-theme-blue w-6" : "bg-gray-400"
                            }`}
                        ></button>
                    ))}
                </div>

            </div>

            {/* --- SAĞ TARAF: İÇERİK --- */}
            <div className="flex flex-col items-start text-left">
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
                    Biz Kimiz?
                </h2>

                <p className="text-gray-500 font-light leading-relaxed mb-8 text-sm md:text-[15px] text-justify md:text-left">
                    Bir aile şirketi olarak 2000 yılında İstanbul’da kurulan Beşkardeşler İnşaat, kurulduğu günden bugüne edindiği bilgi birikimi ve tecrübesiyle yenilikçi projelere imza atmıştır. Hayata geçen her projenin başarısı dikkate alındığı zaman “Doğru...
                </p>

                <Link to="/hakkimizda" className="flex items-center gap-2 text-gray-600 font-bold uppercase text-xs tracking-wider group hover:text-theme-blue transition-colors">
                    devamı 
                    <FaArrowCircleRight className="text-xl group-hover:translate-x-1 transition-transform" />
                </Link>

            </div>

        </div>

      </div>
    </section>
  );
};

export default About;