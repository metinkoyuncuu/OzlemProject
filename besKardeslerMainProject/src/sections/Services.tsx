import { Link } from "react-router-dom"; // Link import edildi
import { FaArrowRight, FaBriefcase, FaUsers, FaCheckCircle, FaBell, FaLongArrowAltRight } from "react-icons/fa";

// Üstteki Hizmet Kartları Verisi
const services = [
  {
    id: 1, // Bu ID, Alo Moloz Hattı (ID:1) ile eşleşmeli
    title: "Alo Moloz",
    image: "/moloz-hafriyat-atimi-768x301-1.jpg"
  },
  {
    id: 2, // Bu ID, Peyzaj (ID:2) ile eşleşmeli
    title: "Peyzaj & Bahçe",
    image: "/nakliye-ve-tasimacilik-768x301-1.jpg" // Görseli ve Başlığı uygunsa
  },
  {
    id: 3, // Bu ID, Ofis Proje (ID:3) ile eşleşmeli
    title: "İnşaat ve Proje",
    image: "/beskardesler-referanslari-768x306-1.jpg"
  },
  {
    id: 4, // Bu ID, Anahtar Teslim (ID:4) ile eşleşmeli
    title: "Yıkım İşlemleri",
    image: "/beskardesler-insaat-yikim-enkaz-hafriyat-moloz-bina-yikimi-768x301-1.jpg"
  }
];

// Mavi Alanın İçindeki 3'lü Özellik Verisi
const features = [
    {
        id: 1,
        icon: <FaBriefcase />,
        title: "Tecrübeli & Uzman Ekip",
        desc: "Uzun yıllardır hizmet verdiğimiz sektörde tecrübeli ekibimiz ile yanınızdayız."
    },
    {
        id: 2,
        icon: <FaUsers />,
        title: "Kurumsal Hizmet",
        desc: "Çalışmalarımızı kurumsal kalitemize yakışır şekilde devam ettiriyoruz."
    },
    {
        id: 3,
        icon: <FaCheckCircle />,
        title: "Yüksek Kalite",
        desc: "Hizmet kalitemizi her zaman en üst düzeyde tutuyor, kendimizi geliştiriyoruz."
    }
];

const Services = () => {
  return (
    <section className="relative w-full mb-20">
      
      {/* --- 1. KISIM: BEYAZ ALAN VE KARTLAR --- */}
      <div className="container mx-auto max-w-[1140px] px-4 pt-10 pb-20 md:pb-32">
        {/* Başlık */}
        <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[3px] bg-theme-blue"></div>
            <h3 className="text-xl font-bold text-theme-blue uppercase tracking-wide">HİZMETLER</h3>
            <div className="flex-1 h-[1px] bg-theme-blue/30"></div>
        </div>

        {/* Kartlar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
            {services.map((item) => (
                // BURADA DEĞİŞİKLİK YAPILDI: Link bileşeni eklendi
                <Link to={`/hizmetler/${item.id}`} key={item.id} className="group bg-white rounded-b-[30px] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer block">
                    <div className="h-[180px] overflow-hidden rounded-t-md">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                    </div>
                    <div className="py-6 flex flex-col items-center justify-center relative">
                        <h4 className="font-bold text-gray-700 group-hover:text-theme-blue transition-colors">{item.title}</h4>
                        <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 group-hover:bottom-3 transition-all duration-300 text-theme-blue">
                             <FaArrowRight size={12} />
                        </div>
                    </div>
                    <div className="h-[4px] bg-theme-blue w-0 group-hover:w-full transition-all duration-500 mx-auto rounded-full"></div>
                </Link>
            ))}
        </div>
      </div>

      {/* --- 2. KISIM: MAVİ ARKA PLAN VE İÇERİK --- */}
      <div 
        className="relative w-full bg-fixed bg-cover bg-center -mt-24 md:-mt-32 z-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144')" }}
      >
        {/* Mavi Overlay */}
        <div className="absolute inset-0 bg-theme-blue/90 mix-blend-multiply"></div>

        <div className="container mx-auto max-w-[1140px] px-4 relative z-20 pt-32 pb-24 text-center text-white">
            
            {/* Ana Başlık */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">Doğru Yerdesiniz</h2>
            <p className="max-w-3xl mx-auto text-blue-100 font-light text-sm md:text-base mb-12 opacity-80">
               Beşkardeşler İnşaat, yürüttüğü hafriyat dökümü, nakliye ve taşımacılık hizmetlerinin yanısıra, inşaatların yıkım ve tadilatını da üstenmektedir.
            </p>

            {/* --- 3'LÜ ÖZELLİK GRİDİ --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {features.map((feature) => (
                    <div key={feature.id} className="flex flex-col items-center group">
                        {/* İkon */}
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-theme-blue text-2xl mb-4 shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                            {feature.icon}
                        </div>
                        {/* Başlık */}
                        <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                        {/* Açıklama */}
                        <p className="text-blue-100 text-xs md:text-sm font-light leading-relaxed opacity-70 px-4">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>

        </div>

        {/* --- 3. KISIM: DUYURULAR BARI --- */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-30 px-4">
             <div className="container mx-auto max-w-[1140px] bg-white rounded-lg shadow-xl py-4 px-6 md:px-8 flex flex-col md:flex-row items-center gap-4 md:gap-8">
                
                {/* Sol Taraf: Zil İkonu */}
                <div className="hidden md:flex w-12 h-12 bg-theme-blue text-white rounded-full items-center justify-center shrink-0">
                    <FaBell size={20} />
                </div>

                {/* Orta: İçerik */}
                <div className="flex-1 text-center md:text-left">
                    <span className="block text-theme-blue font-bold text-sm tracking-wider mb-1">DUYURULAR</span>
                    <p className="text-gray-600 text-sm">
                       25. yılımıza özel bu ayda %10 kampanya fırsatı - <span className="text-gray-400 text-xs">25.08.2001</span>
                    </p>
                </div>

                {/* Sağ: Tümü Butonu */}
                <Link to="/hizmetler" className="flex items-center gap-2 text-theme-blue font-bold text-sm hover:gap-3 transition-all">
                    <FaLongArrowAltRight size={18} />
                    <span>Hizmetleri Gör</span>
                </Link>

             </div>
        </div>

      </div>

    </section>
  );
};

export default Services;