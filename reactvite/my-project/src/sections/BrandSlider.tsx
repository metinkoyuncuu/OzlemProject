import { Link } from "react-router-dom"; // Link'i import etmeyi unutma
import { FaLongArrowAltRight } from "react-icons/fa"; // Ok ikonu için

const companies = [
  "MARS SİNEMA GROUP",
  "CVK MADENCİLİK",
  "EKS DIŞ TİCARET",
  "İKSV",
  "TEMA VAKFI",
  "MACFIT",
  "KANYON AVM",
  "POZİTİF MÜZİK",
  "GLOBAL LİMAN",
  "NATURELGAZ",
  "CONSUS ENERJİ",
  "EGE TURİZM",
  "HAVANA YAYINCILIK"
];

const BrandSlider = () => {
  return (
    <div className="container mx-auto max-w-[1540px] px-4 pb-10 md:pb-20">
      
      {/* BAŞLIK ALANI */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-[3px] bg-theme-blue"></div>
        <h3 className="text-xl font-bold text-theme-blue uppercase tracking-wide">Referanslarımız</h3>
        <div className="flex-1 h-[1px] bg-theme-blue/30"></div>
      </div>

      {/* SLIDER ALANI */}
      <section className="w-full py-12 md:py-16 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        
        <div className="relative w-full">
          {/* Sol/Sağ Fade Efektleri */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          {/* Kayan Şerit */}
          <div className="flex w-max animate-scroll">
            
            {/* 1. Grup */}
            <div className="flex gap-12 md:gap-20 px-6 md:px-10">
              {companies.map((company, index) => (
                <div key={`a-${index}`} className="flex items-center justify-center min-w-[150px] md:min-w-[200px] group cursor-default">
                  <span className="text-lg md:text-xl font-bold text-gray-400 group-hover:text-theme-blue transition-colors duration-300 whitespace-nowrap">
                    {company}
                  </span>
                </div>
              ))}
            </div>

            {/* 2. Grup (Sonsuz Döngü) */}
            <div className="flex gap-12 md:gap-20 px-6 md:px-10">
              {companies.map((company, index) => (
                <div key={`b-${index}`} className="flex items-center justify-center min-w-[150px] md:min-w-[200px] group cursor-default">
                  <span className="text-lg md:text-xl font-bold text-gray-400 group-hover:text-theme-blue transition-colors duration-300 whitespace-nowrap">
                    {company}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* --- YENİ EKLENEN BUTON KISMI --- */}
        <div className="flex justify-center mt-10 md:mt-12 relative z-20">
            <Link 
                to="/referanslar" 
                className="group flex items-center gap-2 border-2 border-theme-blue text-theme-blue px-6 py-2 rounded-full font-bold text-sm hover:bg-theme-blue hover:text-white transition-all duration-300"
            >
                <span>TÜMÜNÜ GÖR</span>
                <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </section>

      {/* Animasyon Stili */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 45s linear infinite;
        }
        @media (max-width: 768px) {
            .animate-scroll {
                animation: scroll 20s linear infinite;
            }
        }
      `}</style>
    </div>
  );
};

export default BrandSlider;