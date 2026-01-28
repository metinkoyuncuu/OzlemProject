import Header from "../sections/Header";
import PageTitle from "../components/PageTitle";
import Footer from "../sections/Footer";
import BotBar from "../sections/BotBar";
import { FaHandshake, FaBuilding } from "react-icons/fa";

const ReferencesPage = () => {
  // --- GÜNCELLENMİŞ FİRMA LİSTESİ (SAĞ SÜTUN) ---
  const workedCompanies = [
    "MARS SİNEMA TURİZM VE SPORTİF TES.İŞL.A.Ş",
    "CVK MİNERAL MADENCİLİK NAKLİYECİLİK İNŞAAT TAAHHÜT VE SANAYİ TİCARET A.Ş",
    "EKS DIŞ TİCARET ANONİM ŞİRKETİ",
    "İSTANBUL KÜLTÜR VE SANAT ÜRÜNLERİ TİCARET ANONİM ŞİRKETİ",
    "TEMA VAKFI",
    "MARS SPORTİF TESİSLER İŞLETMECİLİĞİ A.Ş",
    "TEMA VAKFI İKTİSADİ İŞLETMESİ",
    "KANYON YÖNETİM İŞLETİM VE PAZARLAMA A.Ş",
    "POZİTİF MÜZİK A.Ş",
    "GLOBAL LİMAN İŞLETMELERİ A.Ş",
    "NATURELGAZ SANAYİ VE TİCARET A.Ş",
    "CONSUS ENERJİ İŞLETMECİLİĞİ VE HİZMETLERİ A.Ş",
    "EGE TURİZM VE GAYRİMENKUL YATIRIMLARI A.Ş", // Yazım hatası düzeltildi: YATIRIMKARI -> YATIRIMLARI
    "HAVANA YAYINCILIK TURİZM VE GIDA PAZARLAMA TİCARET A.Ş"
  ];

  // --- REFERANS PROJELERİ LİSTESİ (SOL SÜTUN) ---
  const referenceProjects = [
    "Gayrettepe Dedeman Otel Yıkım ve Yapımı",
    "Bursa Carrefour’sa Yıkım ve Yapımı",
    "Seba Macfit Yıkım ve Yapımı",
    "Akbatı Avm Yıkım ve Yapımı",
    "Kanyon Avm Paribu Cineverse Kurulumu",
    "Bursa Mac One Kurulumu",
    "Maslak Shereton Otel Yıkım ve Yapımı",
    "Beşiktaş, Levent, Davutpaşa, Kadıköy, Pendik Metro İstasyonları Yıkım ve Tadilatı",
    "Mecidiyeköy Astoria AVM Yıkım ve Yapımı",
    "Şirinevler Carrefoure AVM Yıkım ve Yapımı",
    "Levent Kanyon AVM Yıkım ve Yapımı",
    "Beylikdüzü Marmara Park Tadilat ve Dekorasyon İşleri",
    "Ankara Bilkent AVM Tadilat ve Dekorasyon İşleri",
    "Taksim TRT Televizyonu Binası Yıkım ve Tadilatı",
    "Mecidiyeköy Şişli Garanti Bankası Tadilat ve Dekorasyon İşleri",
    "Mecidiyeköy Çevre Hastanesi Tadilat ve Dekorasyon İşleri",
    "Kayseri Forum AVM Tadilat İşleri",
    "Karaköy Global Menkul Değerler Binası Tadilat ve Dekorasyon İşleri",
    "Etiler Akmerkez Tadilat ve Dekorasyon İşleri",
    "Levent Sudan Konsolosluğu Tadilat ve Dekorasyon İşleri",
    "Sarıyer Hacıosman Japon Konsolosluğu Tadilat ve Dekorasyon İşleri",
    "Eyüp Kanal 7 Binası Tadilat, Dekorasyon ve Nakliye İşleri",
    "Mersin Tarsus AVM Tadilat ve Dekorasyon İşleri",
    "Adana Havaalanı Tadilat ve Dekorasyon İşleri",
    "Antalya Havaalanı Tadilat ve Dekorasyon İşleri",
    "Levent Plaza Tadilat ve Dekorasyon İşleri",
    "Ataköy Plus AVM Tadilat ve Dekorasyon İşleri"
  ];

  return (
    <main className="w-full min-h-screen relative bg-white font-sans">
      <Header />

      <PageTitle
        title="REFERANSLAR"
        breadcrumbs={[
            { label: "Ana Sayfa", url: "/" },
            { label: "REFERANSLAR" }
        ]}
      />

      <div className="container mx-auto max-w-[1140px] px-4 py-16">
        
        {/* İki Sütunlu Yapı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* --- SOL SÜTUN - REFERANS PROJELERİ --- */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
                    
                    {/* Görsel Alanı */}
                    <div className="rounded-lg overflow-hidden mb-8 shadow-md relative h-[300px] md:h-[400px]">
                        <img
                            src="/beskardesler-insaat-referanslar.jpg"
                            alt="Referanslarımız"
                            className="w-full h-full object-cover"
                        />
                         <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
                             <h2 className="text-3xl md:text-4xl font-bold text-white text-right drop-shadow-lg">Referanslarımız</h2>
                         </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed font-light text-[15px] mb-6">
                        İnşaat projesi, hafriyat, nakliye, tadilat ve dekorasyon işlerini başarıyla yürüten firmamız, öncü firmaların başlıca tercihlerinden biri olmayı başarmıştır. İşte tamamlamış olduğumuz işlerden bazıları;
                    </p>

                    {/* Proje Listesi */}
                    <ul className="space-y-3 text-gray-700 font-light">
                        {referenceProjects.map((project, index) => (
                            <li key={index} className="flex items-start gap-3 group border-b border-gray-50 pb-2 last:border-0 hover:bg-gray-50 p-2 rounded transition-colors">
                                <FaHandshake className="text-theme-blue mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="group-hover:text-theme-blue transition-colors font-medium text-sm md:text-[15px]">{project}</span>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>

            {/* --- SAĞ SÜTUN - ÇALIŞTIĞIMIZ FİRMALAR --- */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 pb-4 border-b border-gray-100">
                        <FaBuilding className="text-theme-blue" />
                        Çalıştığımız Firmalar
                    </h3>

                    <ul className="space-y-4">
                        {workedCompanies.map((company, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-600 hover:text-theme-blue transition-colors cursor-pointer group">
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-theme-blue transition-colors shrink-0 mt-2"></span>
                                {/* Firma isimleri uzun olduğu için text-xs (küçük) ve uppercase yaptık */}
                                <span className="font-semibold text-xs leading-relaxed uppercase">{company}</span>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>

        </div>

      </div>

      <Footer />
      <BotBar />
    </main>
  );
};

export default ReferencesPage;