import { useState, useMemo, memo } from "react";
import { IconBell, IconClock, IconLectura, IconSearch, IconVideoFilter } from "../../Icons/Icons"; 
import recursosData from "../../../../Jsons/recursos.json";

interface Recurso {
  id: number;
  tipo: "Video" | "Texto";
  titulo: string;
  autoria?: string;
  duracion?: string;
  url?: string;
  categoria: string;
  subtitulo?: string;
  contenido?: string[];
  lecturaEstimada?: string;
}

const RecursoCard = memo(({ recurso, filtroTipo, onSelect }: { 
  recurso: Recurso, 
  filtroTipo: string, 
  onSelect: (r: Recurso) => void 
}) => {
  const isTexto = filtroTipo === "Texto";
  
  return (
    <div className={`bg-white border border-[#3939391A] rounded-[24px] p-6 flex flex-col justify-between hover:shadow-md transition-all w-full
      ${isTexto ? "max-w-[320px] lg:max-w-[289px] h-[238px]" : "max-w-full md:max-w-[449px] h-auto md:min-h-[292px]"}`}>
      
      {isTexto ? (
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <h4 className="font-bold text-[18px] mb-2 leading-tight font-glacial line-clamp-2">{recurso.titulo}</h4>
            <p className="text-[14px] text-[#A3A3A3] line-clamp-3 mb-4 font-glacial">{recurso.subtitulo}</p>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center gap-2 text-[#A3A3A3] text-[12px]">
              <IconClock className="w-4 h-4" />
              <span className="font-glacial">{recurso.lecturaEstimada}</span>
            </div>
            <button 
              onClick={() => onSelect(recurso)}
              className="text-[14px] font-bold border-b border-[#393939] pb-0.5 font-glacial active:scale-95 transition-transform"
            >
              Leer completo
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="relative w-full aspect-video mb-4 rounded-[12px] overflow-hidden bg-gray-100 group">
            <img 
              src={`https://img.youtube.com/vi/${recurso.url?.split('v=')[1]}/hqdefault.jpg`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              alt={recurso.titulo} 
            />
          </div>
          <h4 className="font-bold text-[16px] mb-1 font-glacial line-clamp-1">{recurso.titulo}</h4>
          <p className="text-[12px] text-[#A3A3A3] mb-4 font-glacial">{recurso.autoria} • {recurso.duracion}</p>
          <a href={recurso.url} target="_blank" rel="noreferrer" className="text-[14px] font-bold text-[#393939] hover:underline mt-auto font-glacial inline-block w-fit">
            Míralo en YouTube
          </a>
        </div>
      )}
    </div>
  );
});

export default function Recursos() {
  const [filtroTipo, setFiltroTipo] = useState<"Texto" | "Video">("Texto");
  const [busqueda, setBusqueda] = useState("");
  const [recursoSeleccionado, setRecursoSeleccionado] = useState<Recurso | null>(null);

  const recursosFiltrados = useMemo(() => {
    const term = busqueda.toLowerCase().trim();
    return (recursosData as Recurso[]).filter((rec) => 
      rec.tipo === filtroTipo && rec.titulo.toLowerCase().includes(term)
    );
  }, [filtroTipo, busqueda]);

  return (
    <div className="flex flex-col h-full max-w-[923px] font-sans text-[#393939] px-4 md:px-0">
      
      {/* HEADER */}
      <header className="flex justify-between items-start w-full mt-6 md:mt-0 mb-8">
        <div className="flex flex-col gap-1 pl-10 md:pl-0">
          <h2 className="text-[#393939] font-lora font-semibold text-[28px] md:text-[32px] leading-tight">Recursos</h2>
          <p className="text-[#A3A3A3] font-glacial text-[14px] md:text-[16px]">Para acompañarte en cada etapa</p>
        </div>
        <div className="relative p-2 md:p-3 bg-white rounded-full shadow-sm cursor-pointer border border-[#F0F0F0] shrink-0 hover:bg-gray-50 transition-colors">
          <IconBell className="text-[#393939] w-6 h-6 md:w-[27px] md:h-[29px]" />
          <div className="absolute top-2 right-2 w-3 h-3 bg-[#9FC47C] border-2 border-white rounded-full" />
        </div>
      </header>

      {/* BUSCADOR */}
      <div className="relative mb-6">
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#393939] w-8 h-8 opacity-40" />
        <input
          type="text"
          placeholder="Buscar recursos..."
          className="w-full h-[48px] pl-12 pr-5 rounded-[15px] border border-[#3939391A] focus:border-[#3939394D] outline-none font-glacial text-[16px] transition-all"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* FILTROS */}
      <div className="flex gap-3 mb-8">
        {[
          { id: "Texto", icon: <IconLectura className="w-5 h-5" />, label: "Lectura" },
          { id: "Video", icon: <IconVideoFilter className="w-5 h-5" />, label: "Videos" }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFiltroTipo(btn.id as any)}
            className={`flex items-center gap-2 h-[44px] px-6 rounded-full border transition-all font-glacial ${
              filtroTipo === btn.id ? "bg-[#393939] text-white font-semibold" : "bg-white text-[#A3A3A3] hover:border-[#3939394D]"
            }`}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      {recursosFiltrados.length > 0 ? (
        <div className={`grid gap-6 mb-10 justify-items-center md:justify-items-start ${
          filtroTipo === "Texto" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
        }`}>
          {recursosFiltrados.map((recurso) => (
            <RecursoCard 
              key={recurso.id} 
              recurso={recurso} 
              filtroTipo={filtroTipo} 
              onSelect={setRecursoSeleccionado} 
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-[#A3A3A3] font-glacial">
          No se encontraron recursos que coincidan con tu búsqueda.
        </div>
      )}

      {/* MODAL*/}
      {recursoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-[#393939]/30 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setRecursoSeleccionado(null)} />
          <div className="bg-white w-full max-w-[720px] max-h-[90vh] rounded-[32px] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setRecursoSeleccionado(null)} 
              className="absolute top-6 right-6 z-20 bg-[#F5F5F5] p-2 rounded-full hover:rotate-90 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="overflow-y-auto pt-16 pb-12 px-8 md:px-16 custom-scrollbar">
              <h2 className="text-[#393939] font-glacial font-bold text-[30px] md:text-[42px] leading-tight tracking-tight">{recursoSeleccionado.titulo}</h2>
              <h3 className="text-[#A3A3A3] font-glacial text-[18px] md:text-[20px] mt-4">{recursoSeleccionado.subtitulo}</h3>
              <div className="h-[2px] w-12 bg-[#393939] my-8 rounded-full" />
              <div className="text-[#393939]/90 font-glacial text-[17px] md:text-[18px] leading-relaxed flex flex-col gap-6">
                {recursoSeleccionado.contenido?.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}