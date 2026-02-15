import { useState, useMemo } from "react";
import { 
  IconAsesoramiento, 
  IconBell, 
  IconCalendarEmpty, 
  IconCancelSesion, 
  IconClock, 
  IconStar, 
  IconVirtual 
} from "../../Icons/Icons";

// Datos
import profesionalesData from "../../../../Jsons/profesionales.json";
import sesionesPasadasData from "../../../../Jsons/sesionesPasadas.json";

// Modales
import ModalNuevaSesion from "./Modal/ModalNuevaSesion";
import ModalCalendario from "./Modal/ModalCalendario";
import ModalConfirmarCancelacion from "./Modal/ModalConfirmarCancelacion";

interface Profesional {
  id: number | string;
  nombre: string;
  profesion: string;
  foto: string;
  descripcion: string;
  rating: number;
  categoria: string[];
}

export default function Agenda() {
  const [tabSesiones, setTabSesiones] = useState("Próximas");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  
  const [sesionesAgendadas, setSesionesAgendadas] = useState<any[]>([]);
  const [modalInfoAbierto, setModalInfoAbierto] = useState(false);
  const [modalCalendarioAbierto, setModalCalendarioAbierto] = useState(false);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState<Profesional | null>(null);
  const [sesionAPuntoDeCancelar, setSesionAPuntoDeCancelar] = useState<any | null>(null);

  const manejarAbrirModal = (pro: Profesional) => {
    setProfesionalSeleccionado(pro);
    setModalInfoAbierto(true);
  };

  const irAlCalendario = () => {
    setModalInfoAbierto(false);
    setModalCalendarioAbierto(true);
  };

  const volverAInfo = () => {
    setModalCalendarioAbierto(false);
    setModalInfoAbierto(true);
  };

  const handleConfirmarReserva = (datosSesion: any) => {
    setSesionesAgendadas((prev) => [...prev, datosSesion]);
  };

  const ejecutarCancelacionReal = () => {
    if (sesionAPuntoDeCancelar) {
      setSesionesAgendadas((prev) => prev.filter((s) => s.id !== sesionAPuntoDeCancelar.id));
      setSesionAPuntoDeCancelar(null);
    }
  };

  const categorias = useMemo(() => {
    const todasLasCategorias = (profesionalesData as any[]).flatMap(pro => pro.categoria);
    return ["Todos", ...new Set(todasLasCategorias)];
  }, []);

  const profesionalesFiltrados = (profesionalesData as unknown as Profesional[]).filter((pro) => {
    if (filtroCategoria === "Todos") return true;
    return pro.categoria.includes(filtroCategoria);
  });

  const contactarAsesoramiento = () => {
    const texto = "Hola 🌸 Quiero agendar una sesión en Parent In y me gustaría recibir asesoramiento.";
    const url = `https://api.whatsapp.com/send?phone=5491134281301&text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col h-full max-w-[923px] font-sans text-[#393939] px-4 md:px-0">
      <div className="w-full">
        <header className="flex justify-between items-center w-full mt-6 md:mt-2 mb-8">
          <div className="flex flex-col gap-1 pl-10 md:pl-0">
            <h2 className="text-[#393939] font-lora font-semibold text-[28px] md:text-[32px]">Agenda</h2>
            <p className="text-[#A3A3A3] font-glacial text-[14px] md:text-[16px]">Sesiones con especialistas para acompañarte en cada etapa</p>
          </div>
          <button className="relative p-3 bg-white rounded-full shadow-sm border border-[#F0F0F0] hover:bg-gray-50 transition-colors">
            <IconBell className="text-[#393939] w-6 h-6" />
            <span className="absolute top-2.5 right-2.5 w-[10px] h-[10px] bg-[#9FC47C] border-2 border-white rounded-full"></span>
          </button>
        </header>

        <div className="w-full h-2 min-h-[128px] border-2 border-[#3939394D] rounded-[24px] p-6 md:p-8 mb-5 bg-white">
          <h3 className="font-semibold text-[18px] md:text-[20px] text-[#3939394D] leading-tight mb-2">Próximas sesiones</h3>
          <span className="text-[28px] md:text-[25px] font-bold font-glacial">{sesionesAgendadas.length}</span>
        </div>

        <nav className="flex gap-2 md:gap-4 mb-8">
          {["Próximas", "Pasadas"].map((tab) => (
            <button
              key={tab}
              onClick={() => setTabSesiones(tab)}
              className={`flex items-center justify-center transition-all duration-200 rounded-[25px] h-[42px] px-4 md:px-6 border flex-1 md:flex-none md:w-[165px] font-glacial text-[16px] ${
                tabSesiones === tab ? 'bg-[#393939] text-white border-transparent font-semibold' : 'bg-white text-[#393939] border-[#3939394D]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {tabSesiones === "Próximas" ? (
          <section className="flex flex-col gap-10">
            {sesionesAgendadas.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-4">
                <IconCalendarEmpty className="text-[#3939394D] w-12 h-12 mb-2" />
                <p className="font-lora text-[18px] md:text-[20px] text-[#3939394D]">No tienes sesiones programadas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sesionesAgendadas.map((sesion) => (
                  <div key={sesion.id} className="bg-white rounded-[24px] p-4 md:p-6 border border-[#3939390D] shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                      <img src={sesion.profesional.foto} className="w-12 h-12 rounded-full object-cover" alt="" />
                      <div>
                        <h4 className="font-bold text-[#393939]">Sesión programada con {sesion.profesional.nombre}</h4>
                        <div className="flex flex-wrap gap-4 md:gap-10 text-[#A5ADBB] text-[14px] mt-3 md:mt-5">
                          <div className="flex items-center gap-2">
                            <IconCalendarEmpty className="text-[#3939397D] h-[21px] w-[21px]"/>
                            <span className="capitalize">{sesion.fecha}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconClock className="text-[#3939394D] h-[16px] w-[16px]" />
                            <span>{sesion.hora}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconVirtual className="text-[#3939394D] h-[14px] w-[17px]" />
                            <span>{sesion.modalidad}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-[#3939391A] mb-4" />
                    <button 
                      onClick={() => setSesionAPuntoDeCancelar(sesion)}
                      className="flex items-center gap-2 hover:opacity-70 transition-opacity text-[#FF00004D] font-glacial font-semibold text-[16px]"
                    >
                      <IconCancelSesion />
                      <span>Cancelar sesión</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-[22px] md:text-[24px] font-bold font-lora text-[#393939]">Profesionales</h3>
                <button onClick={contactarAsesoramiento} className="flex items-center justify-center w-[216px] h-[42px] rounded-[15px] bg-[#3939391A] gap-[10px] p-[10px] hover:bg-[#39393926] transition-colors">
                  <IconAsesoramiento className="text-[#393939] w-5 h-5 shrink-0" />
                  <span className="font-lora font-bold text-[16px] text-[#393939]">Asesoramiento</span>
                </button>
              </div>

              <div className="flex gap-2 flex-wrap">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFiltroCategoria(cat)}
                    className={`px-6 py-2 rounded-full text-[14px] border transition-all ${
                      filtroCategoria === cat ? "bg-[#393939] text-white border-[#393939]" : "bg-white text-[#393939] border-[#3939394D]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {profesionalesFiltrados.map((pro) => (
                  <article key={pro.id} className="bg-white border border-[#3939394D] rounded-[15px] p-5 md:p-6 flex flex-col justify-between min-h-[220px]">
                    <div className="flex gap-4 mb-3">
                      <img src={pro.foto} alt={pro.nombre} className="w-[50px] md:w-[60px] h-[50px] md:h-[60px] rounded-full object-cover" />
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-[16px] md:text-[18px] leading-tight">{pro.nombre}</h4>
                        <p className="text-[11px] text-[#A3A3A3] font-bold uppercase tracking-widest">{pro.profesion}</p>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#666] italic font-glacial">{pro.descripcion}</p>
                    <div className="flex justify-between items-center border-t border-[#F9F9F9] pt-4">
                      <div className="flex items-center gap-[4px]">
                        <IconStar />
                        <span className="font-bold text-[#CACA78] text-[14px] font-glacial">{pro.rating.toFixed(1)}</span>
                      </div>
                      <button onClick={() => manejarAbrirModal(pro)} className="bg-[#EDF0F9] text-[#393939] rounded-[15px] font-semibold px-6 h-[40px] text-[16px] hover:bg-[#dfe4f5] transition-all">
                        Agendar
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="space-y-4">
            {sesionesPasadasData.length === 0 ? (
              <div className="py-20 text-center text-[#A3A3A3] font-glacial text-xl bg-gray-50 rounded-xl">
                No hay sesiones pasadas registradas.
              </div>
            ) : (
              sesionesPasadasData.map((sesion) => (
                <div key={sesion.id} className="bg-[#F9F9F9] rounded-[24px] p-4 md:p-6 border border-[#3939390D] opacity-80">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <img src={sesion.profesional.foto} className="w-12 h-12 rounded-full object-cover grayscale" alt="" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-[#393939]">Sesión con {sesion.profesional.nombre}</h4>
                        <span className="text-[11px] bg-[#9FC47C22] text-[#7A9660] px-3 py-1 rounded-full font-bold uppercase">Completada</span>
                      </div>
                      <div className="flex flex-wrap gap-4 md:gap-10 text-[#A5ADBB] text-[14px] mt-3">
                        <div className="flex items-center gap-2">
                          <IconCalendarEmpty className="h-4 w-4" />
                          <span>{sesion.fecha}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconClock className="h-4 w-4" />
                          <span>{sesion.hora}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconVirtual className="h-4 w-4" />
                          <span>{sesion.modalidad}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <ModalNuevaSesion abierto={modalInfoAbierto} alCerrar={() => setModalInfoAbierto(false)} profesional={profesionalSeleccionado as any} onAgendarClick={irAlCalendario} />
        <ModalCalendario abierto={modalCalendarioAbierto} profesional={profesionalSeleccionado} alCerrar={() => setModalCalendarioAbierto(false)} alVolver={volverAInfo} onConfirmarReserva={handleConfirmarReserva} />
        <ModalConfirmarCancelacion abierto={!!sesionAPuntoDeCancelar} alCerrar={() => setSesionAPuntoDeCancelar(null)} alConfirmar={ejecutarCancelacionReal} />
      </div>
    </div>
  );
}