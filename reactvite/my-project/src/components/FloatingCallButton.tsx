import { FaPhoneAlt } from "react-icons/fa";

const FloatingCallButton = () => {
  return (
    <a
      href="tel:+905357245786"
      // Z-INDEX'i 99999 yaptık ki her şeyin üstünde olsun.
      // fixed konumlandırma ile ekranın sağına altına çaktık.
      className="fixed z-[99999] bottom-6 right-4 md:bottom-8 md:right-8 flex items-center gap-3 bg-theme-blue text-white px-4 py-3 md:px-5 md:py-3 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] border-2 border-white/20 hover:bg-blue-800 transition-all duration-300 active:scale-95 group"
    >
      
      {/* İkon Kutusu - Animasyon ekledik */}
      <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
        <FaPhoneAlt className="text-lg animate-pulse" />
      </div>

      {/* Yazı Alanı */}
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[9px] md:text-[10px] font-medium opacity-90 uppercase tracking-widest">7/24 Hizmet</span>
        <span className="text-xs md:text-sm font-bold whitespace-nowrap">ALO MOLOZ HATTI</span>
      </div>

    </a>
  );
};

export default FloatingCallButton;