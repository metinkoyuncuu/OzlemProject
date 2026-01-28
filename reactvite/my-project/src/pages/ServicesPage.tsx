import { Link } from "react-router-dom";
import Header from "../sections/Header";
import PageTitle from "../components/PageTitle";
import Footer from "../sections/Footer";
import BotBar from "../sections/BotBar";

// HİZMET LİSTESİ
const servicesList = [
  {
    id: 1,
    title: "Alo Moloz",
    description: "İnşaat atıkları moloz ve hafriyatların çuvallı veya çuvalsız olarak, çevreyi rahatsız etmeden temiz ve profesyonel bir şekilde atılması en önemli prensiplerimizdendir....",
    image: "/moloz-hafriyat-atimi-768x301-1.jpg"
  },
  {
    id: 2,
    title: "Nakliye ve Taşımacılık",
    description: "Evden eve nakliyat hizmetlerinde geniş araç filosu ve tecrübeli eleman kadrosu ile şehir içi ve şehirlerarası ev, işyeri nakliyatını, depolama hizmetini en güvenilir şekilde yerine getirmeyi, taşıma işlemini müşterilerimiz için zahmetsiz bir şekilde gerçekleştirmek en büyük amaçlarımızdandır.",
    image: "/nakliye-ve-tasimacilik-768x301-1.jpg"
  },
  {
    id: 3,
    title: "İnşaat ve Proje",
    description: "Beşkardeşler İnşaat, büyük alışveriş merkezleri, oteller, hastaneler, konut, apartman ve yaşam alanlarının yapımı ve inşaat işlerini büyük bir özveri ile üstlenmektedir. Geniş organize ekibiyle tecrübeyi lüks yaşam alanlarına taşıyarak, son teknolojiyi bu yapıtlarda kullanmaktadır.",
    image: "/beskardesler-referanslari-768x306-1.jpg"
  },
  {
    id: 4,
    title: "Yıkım İşlemleri",
    description: "Beşkardeşler İnşaat, yıkım, hafriyat ve nakliyat işlerini büyük bir titizlikle yürütürken sürekli büyüyen makine parkı ve deneyimli uzman kadrosuyla Türkiye genelinde geniş bir müşteri yelpazesi elde etmiştir.",
    image: "/beskardesler-insaat-yikim-enkaz-hafriyat-moloz-bina-yikimi-768x301-1.jpg"
  },
  {
    id: 5,
    title: "Tasarım ve Dekorasyon",
    description: "Binalara lüks ve modern bir görünüm kazandırmak ve ayrıca yaşam ortamınızın kalitesini artırmak için uyguladığımız son sistem dekorasyonla sizlere hizmet vermekteyiz.",
    image: "/icdekorasyon-768x301-1.jpg"
  },
];


const ServicesPage = () => {
  return (
    <main className="w-full min-h-screen relative bg-white font-sans">
      <Header />

      <PageTitle 
        title="HİZMETLER" 
        breadcrumbs={[
            { label: "Ana Sayfa", url: "/" },
            { label: "HİZMETLER" }
        ]}
      />

      <div className="container mx-auto max-w-[1140px] px-4 py-16">
        
        {/* Beyaz Kutu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
            
            <div className="flex flex-col gap-8">
                {servicesList.map((service, index) => (
                    <div key={service.id}>
                        
                        {/* KART YAPISI */}
                        <Link to={`/hizmetler/${service.id}`} className="flex flex-col md:flex-row gap-5 group cursor-pointer items-start">
                            
                            {/* --- RESİM ALANI (KİLİTLENMİŞ BOYUT) --- */}
                            {/* md:w-[170px] -> Genişliği 170px'e sabitledim */}
                            {/* md:h-[110px] -> Yüksekliği 110px'e sabitledim */}
                            {/* min-w-... -> Tarayıcı sıkıştırmaya çalışırsa 'Hayır' de */}
                            <div className="w-full h-[180px] md:w-[170px] md:h-[110px] md:min-w-[170px] shrink-0 overflow-hidden rounded-lg relative border border-gray-100 shadow-sm">
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* --- YAZI ALANI --- */}
                            <div className="flex-1">
                                <h3 className="text-[17px] font-bold text-[#1e3a8a] mb-2 group-hover:text-blue-500 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed font-light text-[14px]">
                                    {service.description}
                                </p>
                            </div>

                        </Link>

                        {/* Ayırıcı Çizgi */}
                        {index < servicesList.length - 1 && (
                            <div className="w-full h-[1px] bg-gray-100 mt-8"></div>
                        )}
                    </div>
                ))}
            </div>

        </div>
      </div>

      <Footer />
      <BotBar />
    </main>
  );
};

export default ServicesPage;