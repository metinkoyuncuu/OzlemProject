const projects = [
  { id: 1, title: "Örnek Proje 1", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053" },
  { id: 2, title: "Örnek Proje 2", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070" },
  { id: 3, title: "Örnek Proje 3", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" },
  { id: 4, title: "Örnek Proje 4", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070" },
];

const Projects = () => {
  return (
    <section 
        className="relative w-full py-20 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144')" }}
    >
      {/* Mavi Overlay (Perde) */}
      <div className="absolute inset-0 bg-theme-blue/90 mix-blend-multiply"></div>

      <div className="container mx-auto max-w-[1140px] px-4 relative z-10">
        
        {/* --- BAŞLIK ALANI --- */}
        <div className="mb-10">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-4">
                PROJELER
            </h3>
            {/* Boydan boya beyaz çizgi */}
            <div className="w-full h-[1px] bg-white/40"></div>
        </div>

        {/* --- PROJE KARTLARI (Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
                <div key={project.id} className="bg-white p-3 rounded-[30px] shadow-xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer group">
                    
                    {/* Görsel Alanı */}
                    <div className="h-[200px] rounded-[20px] overflow-hidden relative">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                         {/* Hover Efekti: Görselin üzerine hafif mavi perde */}
                         <div className="absolute inset-0 bg-theme-blue/0 group-hover:bg-theme-blue/20 transition-colors duration-300"></div>
                    </div>

                    {/* Proje Başlığı */}
                    <div className="text-center py-4">
                        <h4 className="text-theme-blue font-bold text-lg">
                            {project.title}
                        </h4>
                    </div>

                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;