import { Link } from "react-router-dom";

interface PageTitleProps {
  title: string;
  breadcrumbs: { label: string; url?: string }[];
}

const PageTitle = ({ title, breadcrumbs }: PageTitleProps) => {
  return (
    <section className="relative w-full h-[350px] md:h-[400px] overflow-hidden">
      
      {/* Arkaplan Görseli */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144')" }}
      >
        {/* Mavi Overlay (Perde) */}
        <div className="absolute inset-0 bg-theme-blue/80 mix-blend-multiply"></div>
      </div>

      {/* İçerik */}
      <div className="relative z-10 container mx-auto max-w-[1140px] px-4 h-full flex flex-col justify-end pb-16 md:pb-20">
        
        {/* Başlık */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
          {title}
        </h1>

        {/* Breadcrumb (Yol Haritası) */}
        <nav className="flex items-center text-xs md:text-sm text-blue-200 font-medium uppercase tracking-wider">
            {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                    {item.url ? (
                        <Link to={item.url} className="hover:text-white transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-white opacity-80">{item.label}</span>
                    )}
                    
                    {/* Son eleman değilse araya ok/slash koy */}
                    {index < breadcrumbs.length - 1 && (
                        <span className="mx-2 opacity-60">»</span>
                    )}
                </div>
            ))}
        </nav>

      </div>
    </section>
  );
};

export default PageTitle;