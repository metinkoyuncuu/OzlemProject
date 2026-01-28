import { Link } from "react-router-dom"; // Link eklendi
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa"; // Telefon ikonu eklendi

const Intro = () => {
  return (
    <section className="relative w-full bg-white pb-16 z-20">
      <div className="container mx-auto max-w-[1140px] px-4">
        
        {/* --- YUVARLAK GÖRSEL (Overlap / Taşma Alanı) --- */}
        <div className="flex justify-center relative -mt-[75px] mb-8">
            <div className="p-2 bg-white rounded-full shadow-xl">
                <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-4 border-gray-100 relative">
                    <img 
                        src="/telefon.jpg" 
                        alt="Intro" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>

        {/* --- METİN İÇERİĞİ --- */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* Başlık */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">
                Alo Moloz Hattı’na bir telefonla ulaşabilirsiniz !
            </h2>

            {/* Açıklama Metni */}
            <p className="text-gray-500 font-light leading-relaxed mb-8 px-4 md:px-12 text-sm md:text-base">
                Adresinizden tüm inşaat atıklarınızı, moloz ve hafriyatları teslim alarak tam özveriyle hizmet vermekteyiz… İnşaat atıkları moloz ve hafriyatların çuvallı veya çuvalsız olarak, çevreyi rahatsız etmeden temiz ve profesyonel bir şekilde...
            </p>

            {/* İnce Çizgi */}
            <div className="w-full h-[1px] bg-gray-100 mb-8"></div>

            {/* BUTONLAR ALANI */}
            <div className="flex items-center gap-6 md:gap-8">
                
                {/* 1. Devamı Linki -> Hizmet ID 1'e gider */}
                <Link to="/hizmetler/1" className="flex items-center gap-2 text-gray-600 font-bold hover:text-theme-blue transition-colors text-sm uppercase tracking-wide group">
                    devamı 
                    <div className="bg-gray-200 rounded-full p-1 group-hover:bg-theme-blue group-hover:text-white transition-all">
                        <FaArrowRight size={10} />
                    </div>
                </Link>

                {/* 2. Hemen Ara Butonu -> Telefon Araması Başlatır */}
                <a 
                    href="tel:05357245786" 
                    className="flex items-center gap-2 bg-theme-blue text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    <FaPhoneAlt size={14} />
                    <span>HEMEN ARA</span>
                </a>

            </div>

        </div>

      </div>
    </section>
  );
};

export default Intro;