import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaHome, FaBriefcase, FaHandshake, FaUsers, FaEnvelope, FaPhoneAlt, FaBars, FaTimes, FaTruck } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      
      {/* --- TOP BAR --- */}
      <div className="bg-theme-blue w-full h-[46px] relative z-1 shadow-sm border-b border-white/10">
        <div className="container mx-auto max-w-[1140px] px-4 h-full flex justify-between items-center relative">
          
          {/* Logo arkasına denk gelen boşluk */}
          <div className="hidden lg:block w-[280px]"></div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] md:text-xs text-white font-medium tracking-wide opacity-90 whitespace-nowrap hidden sm:block">
                        Emirgan Mah. Reşitpaşa Posta Yolu Cad. No: 49 Sarıyer / İSTANBUL (0212) 277 60 74 - (0212) 229 04 34

          </div>

          <div className="flex items-center gap-3 md:gap-4 text-xs text-white ml-auto lg:ml-0">
            <SocialIcon icon={<FaInstagram />} href="https://www.instagram.com/beskardesler_nakliyat?igsh=Y3Iwd3ByODdzb3Fi" />
            <SocialIcon icon={<FaWhatsapp />} href="https://wa.me/905357245786" />
          </div>

        </div>
      </div>

      {/* --- NAVBAR --- */}
      {/* mt değerlerini kaldırdık, artık direkt TopBar'ın altına yapışık */}
      <div className="w-full relative z-1000">
        <div className="container mx-auto max-w-[1340px] px-4">
            
            {/* Arkaplan Barı (Glassmorphism) */}
            <div className="bg-black/60 backdrop-blur-md rounded-b-xl lg:rounded-xl shadow-2xl border border-white/10 px-4 lg:px-8 py-0 lg:h-[90px] flex items-center justify-between relative">

                {/* --- LOGO ALANI (ÜSTE YAPIŞIK & TAŞAN) --- */}
                <div className="relative z-50 self-start">
                    <Link 
                        to="/" 
                        className="absolute -top-[25px] lg:-top-[46px] left-0 bg-white w-[140px] h-[60px] lg:w-[260px] lg:h-[110px] rounded-b-[20px] lg:rounded-[30px] shadow-[0_8px_25px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden group hover:pt-2 transition-all duration-300"
                    >
                        {/* Logo Görseli */}
                        <img 
                            src="/logo.jpeg" 
                            alt="Beşkardeşler İnşaat Logo" 
                            className="w-full h-full object-cover" 
                        />
                    </Link>
                    {/* Hizalama için görünmez kutu */}
                    <div className="w-[140px] lg:w-[260px] h-[1px]"></div>
                </div>

                {/* MENÜ (Masaüstü) */}
                <nav className="hidden lg:flex flex-1 justify-center items-center gap-6 text-white pl-8 h-full">
                    <NavItem to="/" icon={<FaHome />} text="ANASAYFA" active={isActive("/") || isActive("/anasayfa")} />
                    <NavItem to="/hakkimizda" icon={<FaBriefcase />} text="HAKKIMIZDA" active={isActive("/hakkimizda")} />
                    <NavItem to="/referanslar" icon={<FaHandshake />} text="REFERANSLAR" active={isActive("/referanslar")} />
                    <NavItem to="/hizmetler" icon={<FaUsers />} text="HİZMETLER" active={isActive("/hizmetler")} />
                    <NavItem to="/hizmetler/1" icon={<FaTruck />} text="ALO MOLOZ" active={location.pathname === "/hizmetler/1"} />
                    <NavItem to="/iletisim" icon={<FaEnvelope />} text="İLETİŞİM" active={isActive("/iletisim")} />
                </nav>

                {/* SAĞ TARAF (MOBİL BUTON & TELEFON) */}
                <div className="flex items-center gap-4 ml-auto lg:ml-0">
                    
                    {/* MOBİL MENÜ BUTONU */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white text-2xl p-2 bg-theme-blue rounded border border-white/20">
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                    {/* TELEFON (Masaüstü) */}
                    <div className="hidden lg:block">
                        <a href="tel:05357245786" className="flex items-center gap-3 bg-theme-blue text-white px-6 py-2.5 rounded-full hover:bg-white hover:text-theme-blue transition-all duration-300 shadow-lg group border border-white/10">
                            <FaPhoneAlt className="text-sm group-hover:rotate-12 transition-transform" />
                            <span className="font-bold tracking-wide">Bize Ulaşın</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
      </div>

      {/* MOBİL MENÜ LİSTESİ */}
      {isMobileMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white shadow-2xl py-6 px-6 flex flex-col gap-4 z-40 lg:hidden border-t-4 border-theme-blue animate-fade-in-down">
            <MobileNavItem to="/" text="ANASAYFA" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/hakkimizda" text="HAKKIMIZDA" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/referanslar" text="REFERANSLAR" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/hizmetler" text="HİZMETLER" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/hizmetler/1" text="ALO MOLOZ" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/iletisim" text="İLETİŞİM" onClick={() => setIsMobileMenuOpen(false)} />
            
            <div className="mt-4 pt-4 border-t border-gray-100">
                <a href="tel:05510102339" className="flex items-center justify-center gap-2 text-theme-blue font-bold bg-blue-50 py-3 rounded-lg">
                    <FaPhoneAlt />
                    <span>0551 010 23 39</span>
                </a>
            </div>
        </div>
      )}

    </header>
  );
};

// --- YARDIMCI BİLEŞENLER ---

const SocialIcon = ({ icon, href }: { icon: any, href: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-theme-blue transition-all duration-300">
        {icon}
    </a>
);

const NavItem = ({ icon, text, to, active = false }: { icon: any, text: string, to: string, active?: boolean }) => (
  <Link to={to} className={`flex flex-col items-center gap-1 group cursor-pointer relative py-2 px-1`}>
    <span className={`text-lg transition-all duration-300 group-hover:-translate-y-1 drop-shadow-md ${active ? 'text-theme-blue' : 'text-gray-300'}`}>{icon}</span>
    <span className={`text-[11px] font-bold tracking-widest drop-shadow-sm uppercase ${active ? 'text-white' : 'text-gray-200'} group-hover:text-white transition-colors`}>{text}</span>
  </Link>
);

const MobileNavItem = ({ text, to, onClick }: { text: string, to: string, onClick: () => void }) => (
    <Link to={to} onClick={onClick} className="text-gray-700 font-bold border-b border-gray-100 pb-3 hover:text-theme-blue hover:pl-2 transition-all block">{text}</Link>
);

export default Header;