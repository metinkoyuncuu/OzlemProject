import { FaInstagram, FaWhatsapp } from "react-icons/fa"; // FaWhatsapp eklendi

const TopBar = () => {
  return (
    <div className="bg-themeBlue text-white h-[50px] relative z-20">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        
        {/* Sol Yazı */}
        <div className="pl-64 text-xs font-light tracking-wide opacity-90 hidden md:block">
          Emirgan Mah. Reşitpaşa Posta Yolu Cad. No: 49 Sarıyer / İSTANBUL (0212) 277 60 74 - (0212) 229 04 34
        </div>

        {/* Sağ Sosyal İkonlar */}
        <div className="flex gap-4 text-sm pr-4 md:pr-0">
          
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/beskardesler_nakliyat?igsh=Y3Iwd3ByODdzb3Fi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            <FaInstagram size={18} />
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/905357245786" // Numarayı buraya 905xxxxxxxxx formatında yazabilirsin
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            <FaWhatsapp size={18} />
          </a>

        </div>
      </div>
      
      {/* Süsleme */}
      <div className="absolute top-0 right-0 w-[100px] h-full bg-themeBlue rounded-br-[50px] -z-10"></div>
    </div>
  );
};

export default TopBar;