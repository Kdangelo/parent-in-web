import { useState, useEffect } from "react";
import { IconArrowBack, IconCheckAgenda, IconClose, IconVirtual, IconCalendarEmpty, IconClock } from "../../../Icons/Icons";
import { useCalendar } from "../../../../hooks/useCalendar";

interface ModalCalendarioProps {
  abierto: boolean;
  alCerrar: () => void;
  alVolver: () => void;
  profesional: any;
  onConfirmarReserva: (datos: any) => void;
}

export default function ModalCalendario({ abierto, alCerrar, alVolver, profesional, onConfirmarReserva }: ModalCalendarioProps) {
  const [paso, setPaso] = useState(1);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  
  const { daysInMonth, firstDayIndex, diasSemana, month, year, nombreMes } = useCalendar(viewDate);

  useEffect(() => {
    if (abierto) {
      setPaso(1);
      setSelectedDay(null);
      setHoraSeleccionada(null);
      setViewDate(new Date());
    }
  }, [abierto, profesional]);

  if (!abierto || !profesional) return null;

  const ejecutarConfirmacion = () => {
    onConfirmarReserva({
      id: crypto.randomUUID().split('-')[0],
      profesional,
      fecha: `${selectedDay} de ${viewDate.toLocaleString('es-ES', { month: 'long' })}`,
      hora: horaSeleccionada,
      modalidad: "Virtual"
    });
    setPaso(4);
  };

  const modalDimClass = "w-full max-w-[449px] h-[689px] md:max-w-[781px] md:h-[888px]";
  const bgColor = paso === 4 ? "bg-[#F1F6EB]" : "bg-[#F9F9F7]";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-2 md:p-4 font-glacial">
      <div className={`${bgColor} rounded-[40px] shadow-2xl relative flex flex-col overflow-hidden transition-colors duration-500 border border-[#F7F6F1] ${modalDimClass}`}>
        
        {/* HEADER */}
        {paso < 4 && (
          <div className="w-full min-h-[70px] md:h-[78px] relative flex flex-col justify-center shrink-0 border-b border-[#3939390D] md:border-none">
            <div className="flex items-center px-6 md:px-8">
              <button onClick={() => paso === 1 ? alVolver() : setPaso(paso - 1)} className="hover:opacity-50 transition-opacity">
                <IconArrowBack style={{ width: '20px', height: '20px', color: '#393939' }} />
              </button>
              <h2 className="flex-1 text-center font-bold text-[#393939] text-[18px]">Nueva sesión</h2>
              <button onClick={alCerrar} className="absolute right-6 md:right-[32px] hover:opacity-50 transition-opacity">
                <IconClose className="text-[#393939]" />
              </button>
            </div>
            {/* Progress Bar */}
            <div className="hidden md:block absolute top-[74px] left-[130px] w-[520px] h-[4px] bg-white/50 rounded-full">
                <div 
                 style={{ width: `${(paso / 3) * 100}%`, transition: 'width 0.4s' }} 
                 className="h-full rounded-full bg-[#5D6778]" 
                />
            </div>
          </div>
        )}

        {/* CONTENIDO DINÁMICO */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 ${paso === 4 ? 'flex items-center justify-center' : ''}`}>
          
          {paso === 1 && (
            <StepCalendar 
              nombreMes={nombreMes}
              viewDate={viewDate}
              setViewDate={setViewDate}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              horaSeleccionada={horaSeleccionada}
              setHoraSeleccionada={setHoraSeleccionada}
              calendarData={{ daysInMonth, firstDayIndex, diasSemana, year, month }}
              onNext={() => setPaso(2)}
            />
          )}

          {paso === 2 && <StepUserData onNext={() => setPaso(3)} />}

          {paso === 3 && (
            <StepConfirmation 
              profesional={profesional} 
              fecha={`${selectedDay} de ${viewDate.toLocaleString('es-ES', { month: 'long' })}`}
              hora={horaSeleccionada}
              onConfirm={ejecutarConfirmacion}
            />
          )}

          {paso === 4 && (
            <StepSuccess 
              nombre={profesional.nombre}
              fecha={`${selectedDay} de ${viewDate.toLocaleString('es-ES', { month: 'long' })}`}
              hora={horaSeleccionada}
              onClose={alCerrar}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTES ---

const StepCalendar = ({ nombreMes, setViewDate, selectedDay, setSelectedDay, horaSeleccionada, setHoraSeleccionada, calendarData, onNext }: any) => {
  const horarios = ['9:00hs', '9:30hs', '11:00hs', '12:30hs', '13:00hs', '13:30hs', '14:00hs', '15:00hs', '15:30hs', '16:00hs'];
  const { year, month, firstDayIndex, daysInMonth, diasSemana } = calendarData;
  const [error, setError] = useState<string | null>(null);

  // Fecha de hoy (00:00) para comparar
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDayClick = (day: number) => {
    const targetDate = new Date(year, month, day);
    if (targetDate <= today) {
      setError("La fecha seleccionada debe ser mayor a la de hoy");
      setSelectedDay(null);
      return;
    }
    setError(null);
    setSelectedDay(day);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h3 className="font-lora font-bold text-[20px] mb-4 text-[#393939]">Fecha</h3>
      <div className="bg-white rounded-[32px] p-5 shadow-sm mb-2 border border-[#3939390D]">
        <div className="flex justify-between items-center mb-6 px-2 font-bold">
          <button onClick={() => { setViewDate(new Date(year, month - 1, 1)); setError(null); }}>❮</button>
          <span className="capitalize">{nombreMes}</span>
          <button onClick={() => { setViewDate(new Date(year, month + 1, 1)); setError(null); }}>❯</button>
        </div>
        <div className="grid grid-cols-7 gap-y-2 text-center text-[12px]">
          {diasSemana.map((d: string) => <span key={d} className="text-[#A5ADBB] font-medium">{d}</span>)}
          {[...Array(firstDayIndex)].map((_, i) => <div key={i} />)}
          {[...Array(daysInMonth)].map((_, i) => {
            const dayNum = i + 1;
            const isPast = new Date(year, month, dayNum) <= today;
            return (
              <button 
                key={i} 
                disabled={isPast}
                onClick={() => handleDayClick(dayNum)}
                className={`h-9 w-9 flex items-center justify-center mx-auto rounded-full transition-colors ${
                  selectedDay === dayNum ? 'bg-[#393939] text-white font-bold' : 
                  isPast ? 'text-[#D4D4D4] cursor-not-allowed' : 'text-[#393939] hover:bg-gray-100'
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* ALERTA DE ERROR */}
      <div className="h-6 mb-4">
        {error && <p className="text-[#FF0000] text-[14px] font-semibold px-2">⚠️ {error}</p>}
      </div>

      <h3 className="font-lora font-bold text-[20px] mb-4 text-[#393939]">Horarios</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {horarios.map(h => (
          <button key={h} onClick={() => setHoraSeleccionada(h)}
            className={`py-2 rounded-full border transition-all text-[14px] ${horaSeleccionada === h ? 'bg-[#393939] text-white border-[#393939] font-bold' : 'bg-white text-[#393939] border-[#3939391A]'}`}>
            {h}
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-auto">
        <button onClick={onNext} disabled={!selectedDay || !horaSeleccionada || !!error}
          className={`rounded-full w-full max-w-[350px] h-[50px] font-bold text-white transition-all shadow-md ${selectedDay && horaSeleccionada && !error ? 'bg-[#5D6778] hover:brightness-110' : 'bg-[#D4D4D4] cursor-not-allowed'}`}>
          Continuar
        </button>
      </div>
    </div>
  );
};

const StepUserData = ({ onNext }: any) => (
  <div className="animate-in fade-in duration-300 space-y-5">
    <h3 className="font-lora font-bold text-[20px] mb-4">Tus datos</h3>
    <div className="space-y-4">
      {[
        { label: "Nombre y Apellido", val: "Paola Crespo" },
        { label: "Email", val: "paolacrespo@gmail.com" },
        { label: "Número de telefono", val: "+54 2804577898" }
      ].map((field, idx) => (
        <div key={idx}>
          <label className="block text-[#393939] font-bold text-[14px] mb-1.5">{field.label}</label>
          <div className="relative">
            <input type="text" defaultValue={field.val} className="w-full h-[48px] px-4 pr-10 rounded-xl border border-[#3939391A] bg-white text-[14px]" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3939394D]">✎</button>
          </div>
        </div>
      ))}
      <div>
        <label className="block text-[#393939] font-bold text-[14px] mb-1.5">Motivo de la consulta (opcional)</label>
        <textarea placeholder="¿Qué te gustaría en esta sesión?" className="w-full p-4 rounded-xl border border-[#3939391A] bg-white h-[100px] md:h-[130px] resize-none text-[14px]" />
      </div>
    </div>
    <div className="flex justify-center pt-4">
      <button onClick={onNext} className="bg-[#5D6778] rounded-full w-full max-w-[350px] h-[50px] font-bold text-white shadow-md active:scale-95 transition-all">Continuar</button>
    </div>
  </div>
);

const StepConfirmation = ({ profesional, fecha, hora, onConfirm }: any) => (
  <div className="animate-in fade-in duration-300">
    <h3 className="font-lora font-bold text-[20px] mb-6">Confirma tu reserva</h3>
    <div className="bg-white rounded-[32px] p-6 border border-[#3939390D] shadow-sm mb-10">
      <div className="flex items-center gap-4 mb-6">
        <img src={profesional.foto} alt="" className="w-[60px] h-[60px] rounded-full object-cover" />
        <div>
          <h4 className="font-bold text-[#393939]">{profesional.nombre}</h4>
          <p className="text-[#A5ADBB] text-[13px]">{profesional.profesion}</p>
        </div>
      </div>
      <div className="space-y-4 text-[15px] border-t border-[#3939391A] pt-6 font-medium">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <IconCalendarEmpty className="w-4 h-4 text-[#3939394D]" />
                <span>Fecha</span>
            </div>
            <span className="font-bold">{fecha}</span>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <IconClock className="w-4 h-4 text-[#3939394D]" />
                <span>Hora</span>
            </div>
            <span className="font-bold">{hora}</span>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <IconVirtual className="w-4 h-4 text-[#3939394D]" />
                <span>Modalidad</span>
            </div>
            <span className="font-bold">Virtual</span>
        </div>
      </div>
    </div>
    <button onClick={onConfirm} className="bg-[#5D6778] rounded-full w-full h-[50px] font-bold text-white shadow-lg">Confirmar reserva</button>
  </div>
);

const StepSuccess = ({ nombre, fecha, hora, onClose }: any) => (
  <div className="flex flex-col items-center text-center max-w-[350px] animate-in zoom-in-95 duration-500">
    <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center mb-10 shadow-sm">
      <IconCheckAgenda className="text-[#77935D] w-12 h-12" />
    </div>
    <h3 className="font-lora font-bold text-[24px] mb-6 text-[#393939]">¡Reserva confirmada!</h3>
    <p className="text-[#393939] text-[16px] leading-relaxed mb-6">
      Tu sesión con <strong>{nombre}</strong> está agendada para el <br /> 
      {fecha} a las {hora}
    </p>
    <p className="text-[#393939] text-[14px] mb-12 opacity-80 px-4">
      Recibirás un email con los detalles y un recordatorio 24hs antes de la sesión
    </p>
    <button onClick={onClose} className="bg-[#5D6778] rounded-full w-full h-[52px] text-white font-bold shadow-md">Cerrar</button>
  </div>
);