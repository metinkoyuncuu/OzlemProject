// Sadece Instagram ve Whatsapp kalacak
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
const BotBar = () => {
  return (
    <div className="w-full bg-theme-blue text-white py-4 relative z-20">
      
      {/* Sol üst köşeye hafif bir oval süs */}
      <div className="absolute top-0 left-0 w-[50px] h-full bg-theme-blue rounded-tr-[30px] -z-10 translate-y-[-50%]"></div>

      <div className="container mx-auto max-w-[1140px] px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          
          {/* --- SOL TARAF: COPYRIGHT --- */}
          <div className="text-xs font-light tracking-wider opacity-90 text-center md:text-left">
            <span className="font-bold">© 2024 Beşkardeşler İnşaat.</span> Tüm Hakları Saklıdır.
          </div>

          {/* --- SAĞ TARAF: SOSYAL İKONLAR --- */}
          <div className="flex items-center gap-4 text-xs">
            
            {/* Instagram */}
            <SocialIcon 
                icon={<FaInstagram />} 
                href="https://www.instagram.com/beskardesler_nakliyat?igsh=Y3Iwd3ByODdzb3Fi" 
            />
            
            {/* WhatsApp */}
            <SocialIcon 
                icon={<FaWhatsapp />} 
                href="https://wa.me/905357245786" 
            />


          </div>

        </div>
      </div>
    </div>
  );
};

// --- GÜNCELLENMİŞ YARDIMCI BİLEŞEN ---
// Artık 'href' prop'u alıyor ve target="_blank" içeriyor.
const SocialIcon = ({ icon, href }: { icon: any, href: string }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-theme-blue transition-all duration-300"
    >
        {icon}
    </a>
);

export default BotBar;