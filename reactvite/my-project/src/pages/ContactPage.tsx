import { FaFacebookF, FaThumbsUp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Header from "../sections/Header";
import PageTitle from "../components/PageTitle";
import Footer from "../sections/Footer";
import BotBar from "../sections/BotBar";

const ContactPage = () => {
  return (
    <main className="w-full min-h-screen relative bg-white font-sans">
      
      <Header />

      <PageTitle 
        title="İLETİŞİM" 
        breadcrumbs={[
            { label: "Ana Sayfa", url: "/" },
            { label: "İLETİŞİM" }
        ]}
      />

      <div className="container mx-auto max-w-[1140px] px-4 py-16">
        
        {/* Beyaz Kutu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-10">
            
            {/* GRID YAPISI: Masaüstünde 2 Sütun (Sol: Bilgi, Sağ: Harita) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                
                {/* --- SOL: İLETİŞİM BİLGİLERİ --- */}
                <div className="flex flex-col h-full justify-center">
                    
                    <div className="flex flex-col gap-8 text-gray-700 mb-8">
                        {/* Adres */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-theme-blue" />
                                Adres :
                            </h3>
                            <p className="font-light text-[15px] leading-relaxed ml-7">
                                Emirgan Mah. Reşitpaşa Posta Yolu Cad. No: 49
<br />
                                Sarıyer / İSTANBUL
                            </p>
                        </div>

                        {/* Telefon */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <FaPhoneAlt className="text-theme-blue" />
                                Telefon :
                            </h3>
                            <p className="font-light text-[15px] leading-relaxed ml-7 hover:text-theme-blue transition-colors">
                               <a href="tel:05357245786">0535 724 57 86</a> - <a href="tel:05510102339">0551 010 23 39</a> 
                            </p>
                        </div>

                        {/* E-Posta */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <FaEnvelope className="text-theme-blue" />
                                E-Posta :
                            </h3>
                            <p className="font-light text-[15px] leading-relaxed ml-7 hover:text-theme-blue transition-colors">
                                <a href="mailto:bilgi@temademo.com">ayhanbeskardesler@gmail.com</a>
                            </p>
                        </div>
                    </div>

                    {/* Ayırıcı Çizgi */}
                    <div className="w-full h-[1px] bg-gray-100 my-6"></div>

                    {/* Sosyal Medya Butonları */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-[4px] text-xs font-bold hover:opacity-80 transition">
                            <FaXTwitter size={14} /> <span>Gönder</span>
                        </button>
                        <button className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-1.5 rounded-[4px] text-xs font-bold hover:bg-blue-700 transition">
                            <FaThumbsUp size={14} /> <span>Beğen</span>
                        </button>
                        <button className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-1.5 rounded-[4px] text-xs font-bold hover:bg-blue-700 transition">
                            <span>Paylaş</span>
                        </button>
                    </div>

                </div>

                {/* --- SAĞ: GOOGLE MAPS (IFRAME) --- */}
                <div className="w-full h-[350px] lg:h-auto min-h-[350px] bg-gray-200 rounded-lg overflow-hidden shadow-md border border-gray-200 relative">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.3994335773114!2d29.041303875563184!3d41.10396681352812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5f508bbffff%3A0xbcc06277d5b2d332!2sEmirgan%2C%20Posta%20Yolu%20Cd.%20No%3A49%2C%2034467%20Sar%C4%B1yer%2F%C4%B0stanbul!5e0!3m2!1sen!2str!4v1769617583930!5m2!1sen!2str" 
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps"
                    ></iframe>
                </div>

            </div>

        </div>

      </div>

      <Footer />
      <BotBar />
    </main>
  );
};

export default ContactPage;