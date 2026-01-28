import { Link } from "react-router-dom";

// Görseldeki gibi 8 tane örnek ürün
const products = [
  { id: 1, title: "Örnek Ürün 1", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070" }, // Çalışma Odası
  { id: 2, title: "Örnek Ürün 2", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069" }, // Oda
  { id: 3, title: "Örnek Ürün 3", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965" }, // Ev Dış
  { id: 4, title: "Örnek Ürün 4", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" }, // Ofis
  { id: 5, title: "Örnek Ürün 5", image: "https://images.unsplash.com/photo-1484154218962-a1c002085aac?q=80&w=2070" }, // Koltuk
  { id: 6, title: "Örnek Ürün 6", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" }, // Modern Bina
  { id: 7, title: "Örnek Ürün 7", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070" }, // Bahçeli Ev
  { id: 8, title: "Örnek Ürün 8", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070" }, // Salon
];

const ProductGrid = () => {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto max-w-[1140px] px-4">
        
        {/* BEYAZ KAPSAYICI KUTU */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-10">
            
            {/* GRID YAPISI: Mobilde 1, Tablette 2, Masaüstünde 4 Sütun */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                
                {products.map((product) => (
                    /* Link Bileşeni: Tıklayınca /urunler/1 gibi sayfaya gider */
                    <Link to={`/urunler/${product.id}`} key={product.id} className="group cursor-pointer">
                        
                        {/* Görsel Kutusu */}
                        <div className="h-[160px] w-full overflow-hidden rounded-lg relative">
                            <img 
                                src={product.image} 
                                alt={product.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Hover olunca hafif bir parlama efekti */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition-colors"></div>
                        </div>

                        {/* Başlık */}
                        <h3 className="text-center font-bold text-gray-700 mt-4 text-sm md:text-[15px] group-hover:text-theme-blue transition-colors">
                            {product.title}
                        </h3>

                    </Link>
                ))}

            </div>

        </div>

      </div>
    </section>
  );
};

export default ProductGrid;