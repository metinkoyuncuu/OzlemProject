import { useParams } from "react-router-dom";
import {  FaThumbsUp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Header from "../sections/Header";
import PageTitle from "../components/PageTitle";
import Footer from "../sections/Footer";
import BotBar from "../sections/BotBar";

// --- HİZMET VERİTABANI (ARTIK İÇERİK DE BURADAN GELİYOR) ---
const servicesDatabase = [
  {
    id: 2,
    title: "Peyzaj & Bahçe Düzenleme",
    image: "/nakliye-ve-tasimacilik-768x301-1.jpg",
    paragraphs: [
      "Evden eve nakliyat hizmetlerinde geniş araç filosu ve tecrübeli eleman kadrosu ile şehir içi ve şehirlerarası ev, işyeri nakliyatını, depolama hizmetini en güvenilir şekilde yerine getirmeyi, taşıma işlemini müşterilerimiz için zahmetsiz bir şekilde gerçekleştirmek en büyük amaçlarımızdandır.",
      "Eşya taşınması konusunda gerekli hassasiyeti sorunsuzca gösteren ekibimiz, insanların da güvenini ve itibarını sonuna dek korumaktadır. Taşınacak eşyaların evden eve nakliyatını titizce gerçekleştirip sorunsuz ve hızlı bir şekilde yerine ulaştırarak teslim etmekteyiz.",
      "Eşya taşıma işlerinin yanı sıra, moloz ve inşaat atıklarının da nakliye edilmesi tarafımızdan sağlanmaktadır. Türkiye’nin her yerine sağladığımız nakliye hizmeti ve referanslarımız bu konudaki tecrübemizin en büyük göstergesidir."
    ]
  },
  {
    id: 3,
    title: "İnşaat ve Proje",
    image: "/beskardesler-referanslari-768x306-1.jpg",
    paragraphs: [
      "<b>Beşkardeşler İnşaat</b>, büyük alışveriş merkezleri, oteller, hastaneler, konut, apartman ve yaşam alanlarının yapımı ve inşaat işlerini büyük bir özveri ile üstlenmektedir. Geniş organize ekibiyle tecrübeyi lüks yaşam alanlarına taşıyarak, son teknolojiyi bu yapıtlarda kullanmaktadır.",
      "İnşaat yapımının büyük bir sorumluluk gerektirdiğinin farkında olan Beşkardeşler İnşaat, başta İstanbul olmak üzere Türkiye genelinde birçok köklü projenin inşaatında faaliyet göstermiştir.",
      "Her türlü bina, AVM, otel ve yaşam alanı inşaatlarını sorunsuzca A’dan Z’ye tamamlayarak teslim etmektedir.",
      "Beşkardeşler İnşaat, referanslarda belirtilen inşaat işlerini büyük bir gururla tamamlamanın haklı gururunu yaşamaktadır…"
    ]
  },
  {
    id: 4,
    title: "Yıkım İşlemleri",
    image: "/beskardesler-insaat-yikim-enkaz-hafriyat-moloz-bina-yikimi-768x301-1.jpg",
    paragraphs: [
      "<b>Beşkardeşler İnşaat</b>, yıkım, hafriyat ve nakliyat işlerini büyük bir titizlikle yürütürken sürekli büyüyen makine parkı ve deneyimli uzman kadrosuyla Türkiye genelinde geniş bir müşteri yelpazesi elde etmiştir.",
      "Yıkım işlerindeki başarısını ve tecrübesini günden güne arttırarak yıkım sonrası enkaz kaldırma ve nakliye işlerini de uzman ekibiyle sürdürmektedir. <b> Bina, otel, alış veriş merkezi</b> ve bir çok yaşam alanı projesini yenilemek gayesiyle eski yapıların yıkımlarını çevreye rahatsızlık vermeden hızlı ve başarılı bir şekilde yürütmektedir. Eski yapıların yeniden planlanıp tekrar yapılması için ön hazırlık oluşturmaktadır.",
      "Kentsel dönüşüm hizmetlerini profesyonel yıkım ekibiyle sürdürerek, insanlara yeni ve lüks yaşam alanları oluşturmayı amaç edinmektedir. Son teknolojiye uygun metotlu yıkım yöntemleriyle rakiplerinden daha üstün, hızlı ve pratik olarak amacına hizmet etmektedir."
    ]
  },
  {
    id: 5,
    title: "Tasarım ve Dekorasyon",
    image: "/icdekorasyon-768x301-1.jpg",
    paragraphs: [
      "<b>Beşkardeşler İnşaat</b>, yıkım, hafriyat ve nakliyat işlerini büyük bir titizlikle yürütürken sürekli büyüyen makine parkı ve deneyimli uzman kadrosuyla Türkiye genelinde geniş bir müşteri yelpazesi elde etmiştir.",
      "Yıkım işlerindeki başarısını ve tecrübesini günden güne arttırarak yıkım sonrası enkaz kaldırma ve nakliye işlerini de uzman ekibiyle sürdürmektedir. <b> Bina, otel, alış veriş merkezi</b> ve bir çok yaşam alanı projesini yenilemek gayesiyle eski yapıların yıkımlarını çevreye rahatsızlık vermeden hızlı ve başarılı bir şekilde yürütmektedir. Eski yapıların yeniden planlanıp tekrar yapılması için ön hazırlık oluşturmaktadır.",
      "Kentsel dönüşüm hizmetlerini profesyonel yıkım ekibiyle sürdürerek, insanlara yeni ve lüks yaşam alanları oluşturmayı amaç edinmektedir. Son teknolojiye uygun metotlu yıkım yöntemleriyle rakiplerinden daha üstün, hızlı ve pratik olarak amacına hizmet etmektedir."
    ]
  },
  {
    id: 1,
    title: "ALO MOLOZ HATTI",
    image: "/moloz-hafriyat-atimi-768x301-1.jpg", // Kamyon resmi koydum şimdilik
    paragraphs: [
      "İnşaat atıkları moloz ve hafriyatların çuvallı veya çuvalsız olarak, çevreyi rahatsız etmeden temiz ve profesyonel bir şekilde atılması en önemli prensiplerimizdendir.",
      "İnşaat sahasındaki yıkım sonrasındaki oluşan moloz ve hafriyatın bir an önce diğer işleri yavaşlatmaması için temiz bir şekilde çuvalsız olarak nakliye araçlarına kepçelerle büyük bir titizlikle aktarılmaktadır.",
      "Hafriyatın oluşmasıyla ortaya çıkan enkaz, diğer işlerin yürütülmesini büyük ölçüde kısıtlamaktadır. Bu sayede moloz hafriyatının en kısa sürede temiz ve profesyonelce yüklenerek atılması, inşaatın yürütülme sürecini hızlandırmaktadır. Bu noktada devreye giren ekibimiz yıkım, moloz atımı ve nakliye süreçlerinin sorumluluğunu taşımaktadır.",
      "Oteller, hastaneler, okullar, alış veriş merkezleri, iş yerleri, evler vb. yerlerdeki iç tadilat ve dekorasyonların sağlanması için yıkım ve hafriyat işleri de tarafımızdan yürütülmektedir. 30 kg’lık moloz çuvallarıyla, ekibimiz tarafından çuvallanan molozlar uzaman ekibimiz sayesinde araçlarla nakliye edilmektedir.",
      "Moloz ve inşaat hafriyatının yüklenmesi ve nakliye edilmesi konusunda geniş araç parkımız ve uzman ve deneyimli kadromuzla hizmetinizdeyiz…",
      "Çuvallı ve çuvalsız her türlü molozlarınızın atılması için 7/24 saat açık Alo Moloz Hattı‘nı arayabilirsiniz.",
      "<b> Alo Moloz Hattı İrtibat Telefonları: (0535) 724 57 86 – (0551) 010 23 39 </b>",
      "<b><u>Önemli Bilgi:</u></b> <b> 5326 sayılı Kabahatler Kanunu</b> ‘nun 41-4 maddesi gereğince, inşaat atık ve artıklarını, bunların toplanması ve depolanmasına ait yerler dışına atan kişilere <b>143 TL</b> ile <b> 4 bin 355 TL </b> arasında para cezası verilmektedir."
    ]
  },
];

const ServiceDetail = () => {
  const { id } = useParams();
  const serviceId = Number(id);
  const service = servicesDatabase.find(s => s.id === serviceId);

  // Eğer ID bulunamazsa (veya hatalı linkse) varsayılan veriler
  const displayTitle = service ? service.title : `Hizmet Bulunamadı`;
  let displayImage = service ? service.image : "https://via.placeholder.com/800x600";
  const displayParagraphs = service ? service.paragraphs : ["Bu hizmete ait detaylı bilgi bulunmamaktadır."];



  return (
    <main className="w-full min-h-screen relative bg-white font-sans">
      <Header />

      <PageTitle 
        title={displayTitle} 
        breadcrumbs={[
            { label: "Ana Sayfa", url: "/" },
            { label: "HİZMETLER", url: "/hizmetler" },
            { label: displayTitle }
        ]}
      />

      <div className="container mx-auto max-w-[1140px] px-4 py-16">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-10">
            
            {/* --- İÇERİK BLOĞU --- */}
            <div className="text-gray-600 font-light text-[15px] leading-relaxed block overflow-hidden">
                
                {/* SOLDAKİ RESİM (Float Left ile metin sarmalaması) */}
                <img 
                    src={displayImage} 
                    alt={displayTitle} 
                    className="w-full md:w-[400px] h-auto rounded-lg shadow-md mb-6 md:mr-8 md:float-left object-cover"
                />

                {/* DİNAMİK PARAGRAFLAR */}
                {/* Veritabanındaki paragrafları döngüyle basıyoruz */}
                {/* DİNAMİK PARAGRAFLAR */}
{displayParagraphs.map((paragraph, index) => (
    <p 
        key={index} 
        // YENİ EKLENEN KISIM: [&>u]:underline
        className="mb-6 [&>b]:font-bold [&>b]:text-black [&>u]:underline"
        dangerouslySetInnerHTML={{ __html: paragraph }}
    />
))}

            </div>

            <div className="w-full h-[1px] bg-gray-100 my-8"></div>

            {/* SOSYAL MEDYA */}
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
                <span className="text-xs text-gray-500 ml-2">Arkadaşların arasında bunu ilk beğenen sen ol.</span>
            </div>

        </div>

      </div>

      <Footer />
      <BotBar />
    </main>
  );
};

export default ServiceDetail;