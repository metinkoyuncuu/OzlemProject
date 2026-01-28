import { FaMapMarkerAlt } from "react-icons/fa";

const ContactMap = () => {
  return (
    // DEĞİŞİKLİK BURADA: 'pt-16 md:pt-0' ekledik. Mobilde üstten boşluk verdik.
    <section className="w-full bg-white pb-20 pt-16 md:pt-0">
      <div className="container mx-auto max-w-[1140px] pt-16 px-4">
        
        {/* Mavi Kapsayıcı Kart */}
        <div className="w-full bg-theme-blue rounded-[30px] overflow-hidden shadow-xl flex flex-col md:flex-row h-[450px] md:h-[350px]">
            
            {/* --- SOL TARAF: HARİTA --- */}
            <div className="w-full md:w-2/3 h-full bg-gray-200 relative">
                <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.3994335773114!2d29.041303875563184!3d41.10396681352812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5f508bbffff%3A0xbcc06277d5b2d332!2sEmirgan%2C%20Posta%20Yolu%20Cd.%20No%3A49%2C%2034467%20Sar%C4%B1yer%2F%C4%B0stanbul!5e0!3m2!1sen!2str!4v1769617583930!5m2!1sen!2str" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 grayscale-[20%]"
                ></iframe>
            </div>

            {/* --- SAĞ TARAF: ADRES BİLGİSİ --- */}
            <div className="w-full md:w-1/3 bg-theme-blue text-white flex flex-col items-center justify-center p-8 text-center gap-4 relative z-10">
                
                {/* Konum İkonu */}
                <div className="text-4xl md:text-5xl mb-2 drop-shadow-md">
                    <FaMapMarkerAlt />
                </div>

                {/* Adres Metni */}
                <div className="font-medium text-base md:text-lg leading-relaxed max-w-[250px]">
                    <p>Emirgan Mah. Reşitpaşa Posta Yolu Cad. No: 49</p>
                    <p className="font-bold mt-1"> Sarıyer / İSTANBUL</p>
                </div>

            </div>

        </div>

      </div>
    </section>
  );
};

export default ContactMap;