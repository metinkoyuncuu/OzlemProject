import {  FaThumbsUp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // X ikonu için (react-icons paketini güncellemen gerekebilir, yoksa FaTwitter kullan)

const AboutDetail = () => {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto max-w-[1140px] px-4">
        
        {/* BEYAZ İÇERİK KUTUSU (Tek Sütun) */}
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 border border-gray-100">
            
            {/* Paragraf 1 */}
            <p className="text-gray-600 leading-relaxed mb-6 font-light text-[15px]">
                Bir aile şirketi olarak 2000 yılında İstanbul’da kurulan <b>Beşkardeşler İnşaat</b>, kurulduğu günden bugüne edindiği bilgi birikimi ve tecrübesiyle yenilikçi projelere imza atmıştır.
            </p>

            {/* Paragraf 2 */}
            <p className="text-gray-600 leading-relaxed mb-6 font-light text-[15px]">
                Hayata geçen her projenin başarısı dikkate alındığı zaman <b>“Doğru Yerde, Doğru Zamanda, Doğru Proje”</b> kavramının Beşkardeşler’in profesyonel iş anlayışıyla birleştiği gerçeği genel kabul gören bir anlayışa dönüşmüştür.
            </p>

            {/* Paragraf 3 */}
            <p className="text-gray-600 leading-relaxed mb-6 font-light text-[15px]">
                Ülkesine değer katan tüm çalışmalarıyla öncü olan Beşkardeşler, gelişimine bir halka daha ekleyerek hafriyat ve her türlü moloz dökümünü de başarıyla sürdürmektedir. <b>Beşkardeşler</b> hem ülke genelinde beğeni toplayan birçok inşaat projesinin, hem de ortak girişim anlayışıyla kurulan karma projelerinin hizmetinde aktif bir şekilde rol almaktadır. Güvenin ve başarının simgesi haline gelen <b>Beşkardeşler</b>, bu değerlerini nesilden nesile aktarabilmek ve başarılarına artı değerler katabilmek adına iş hayatındaki istikrarlı ve sağlam ilerleyişine devam etmektedir.

            </p>

            {/* Ayırıcı Çizgi */}
            <div className="w-full h-[1px] bg-gray-100 my-6"></div>

            {/* SOSYAL MEDYA BUTONLARI */}
            <div className="flex flex-wrap items-center gap-3">
                
                {/* X (Twitter) Gönder Butonu */}
                <button className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-[4px] text-xs font-bold hover:opacity-80 transition">
                    <FaXTwitter />
                    <span>Gönder</span>
                </button>

                {/* Facebook Beğen Butonu */}
                <button className="flex items-center gap-1 bg-[#1877F2] text-white px-3 py-1 rounded-[4px] text-xs font-bold hover:bg-blue-700 transition">
                    <FaThumbsUp />
                    <span>Beğen</span>
                </button>

                {/* Facebook Paylaş Butonu */}
                <button className="flex items-center gap-1 bg-[#1877F2] text-white px-3 py-1 rounded-[4px] text-xs font-bold hover:bg-blue-700 transition">
                    <span>Paylaş</span>
                </button>
                
                {/* Bilgi Yazısı */}
                <span className="text-xs text-gray-500 ml-1">
                    Arkadaşların arasında bunu ilk beğenen sen ol.
                </span>

            </div>

        </div>

      </div>
    </section>
  );
};

export default AboutDetail;