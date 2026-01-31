import Flor from "../../../../assets/florcita.png"

interface ResultProps {
  score: number | null;
  onClose: () => void;
}

export default function ResultModal({ score, onClose }: ResultProps) {
  if (!score) return null;

  const getConfig = () => {
    if (score <= 2) return {
      title: "Señal de atención",
      bgColor: "stroke-[#FADBD8]", 
      strokeColor: "stroke-[#FF8080]",
      msg: "Se percibe mayor tensión. Pedir apoyo también es parte del cuidado.",
      recoms: ["Solicitar acompañamiento", "Pedir una pausa o establecer límites"],
      icon: "😟"
    };
    if (score === 3) return {
      title: "Señal de ajuste",
      bgColor: "stroke-[#FEF9E7]",
      strokeColor: "stroke-[#E6D64D]",
      msg: "Se percibe cierta tensión. Pequeños cambios pueden hacer una gran diferencia.",
      recoms: ["Elegir un área a ajustar", "Explorar opciones de apoyo"],
      icon: "😐"
    };
    return {
      title: "Señal de apoyo",
      bgColor: "stroke-[#E1EDD6]",
      strokeColor: "stroke-[#A8D08D]",
      msg: "Se percibe un buen nivel de apoyo. Tomar registro de esto ayuda a sostenerlo.",
      recoms: ["Registrar qué está ayudando hoy", "Sostener el hábito de realizar check in"],
      icon: "😊"
    };
  };

  const config = getConfig();
  const radius = 80;
  const circumference = 2 * Math.PI * radius; // 502.65

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[80] p-4 backdrop-blur-sm">{/* Modal Container: 525x631px en Desktop */}
      <div className="bg-white rounded-[40px] flex flex-col items-center text-center shadow-xl relative overflow-hidden w-full max-w-[525px] min-h-[631px]">
        <div className="relative flex items-center justify-center w-[200px] h-[200px] mt-[30px]">
          <svg className="w-full h-full -rotate-90">
            {/* Círculo*/}
            <circle 
              cx="100" cy="100" r={radius} 
              strokeWidth="20" fill="transparent" 
              className={`${config.bgColor}`} 
            />
            {/* Círculo de progreso */}
            <circle 
              cx="100" cy="100" r={radius} 
              strokeWidth="20" fill="transparent"
              strokeDasharray={circumference} 
              strokeDashoffset={circumference - (circumference * (score * 20)) / 100}
              strokeLinecap="round" 
              className={`${config.strokeColor} transition-all duration-1000 ease-out`} 
            />
          </svg>
          <span className="absolute text-6xl">{config.icon}</span>
        </div>

        {/* Textos */}
        <h3 className="text-[#393939] font-bold text-[24px] mt-6 font-inter">{config.title}</h3>
        <p className="text-[#393939]/60 px-6 md:px-12 mb-8 text-[16px] max-w-[424px] leading-tight font-glacial">
          {config.msg}
        </p>

        <div className="bg-[#FCFAF6] rounded-[25px] p-6 text-left border border-[#F0F0F0] w-[90%] md:w-[461px]">
          <h4 className="flex items-center gap-2 font-bold text-[#393939] mb-3 text-[15px] font-glacial">
            <span className="text-[#3B4CB8]"><img src={Flor} alt="icono de flor" /></span> Recomendaciones
          </h4>
          <ul className="text-[#393939] text-[14px] space-y-2 font-glacial">
            {config.recoms.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#393939]/40 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <button 
          onClick={onClose} 
          className="absolute bottom-10 text-[#393939] font-bold text-lg hover:opacity-70 transition-opacity p-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}