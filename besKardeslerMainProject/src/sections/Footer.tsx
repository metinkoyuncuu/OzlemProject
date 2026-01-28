import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white relative border-t border-theme-blue/30">
      
      <div className="container mx-auto max-w-[1140px] px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          
          {/* --- SOL TARAF: LOGO VE AÇIKLAMA --- */}
          <div className="flex flex-col items-center md:items-start">
            
            {/* Logo Kutusu */}
            <Link 
                to="/" 
                className="block bg-white w-[160px] h-[70px] lg:w-[260px] lg:h-[110px] rounded-[20px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 hover:-translate-y-1 transition-transform duration-300"
            >
                {/* Full Görsel Ayarı */}
                <img 
                    src="/logo.jpeg" 
                    alt="Beşkardeşler İnşaat Logo" 
                    className="w-full h-full object-cover" 
                />
            </Link>

           
          </div>

          {/* --- SAĞ TARAF: TELEFON BUTONU --- */}
          <div>
            <a href="tel:05357245786" className="flex items-center gap-3 border-2 border-theme-blue text-theme-blue px-8 py-3 rounded-full hover:bg-theme-blue hover:text-white transition-all duration-300 font-bold text-lg group shadow-sm hover:shadow-lg">
                <FaPhoneAlt className="text-sm group-hover:rotate-12 transition-transform" />
                <span>Bize Ulaşın</span>
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;