import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ProgressStepperComponent from "./ui/ProgressStepperComponent";
import Data from "../../../Jsons/recursos.json";
import CheckInModal from "./MainLayout/Modal/CheckInModal"; 
import ResultModal from "./MainLayout/Modal/ResultModal";

import { 
  IconBell, 
  IconArrowRight, 
  IconRecursos, 
  IconChecklist, 
  IconCheckIn, 
  IconComunidad, 
  IconAgenda,
  IconInfoCircle,
  IconTrabajo,
  IconHogar,
  IconTimer,
  IconBabyStatus, 
  IconEmocionPlus
} from "../Icons/Icons";
import FlowerIcon from "../../assets/Ellipse 49.png";
import AvatarPlaceholder from "../../assets/Ellipse 63.png";

const CircularProgress = ({ percentage, children }: { percentage: number, children: React.ReactNode }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-[58px] h-[58px] md:w-[63px] md:h-[63px]">
      <svg className="absolute w-full h-full -rotate-90">
        <circle cx="50%" cy="50%" r={radius} stroke="#3939390D" strokeWidth="3" fill="transparent" />
        <circle
          cx="50%" cy="50%" r={radius} stroke="#9FC47C" strokeWidth="3" fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="z-10 bg-[#F8F9F5] rounded-full w-12 h-12 md:w-[52px] md:h-[52px] flex items-center justify-center border border-[#3939390D]">
        {children}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, subtitle, icon: Icon, children, footerText, onFooterClick, headerRight }: any) => (
  <div className="bg-white border border-[#3939391A] rounded-4xl p-5 md:p-6 shadow-sm flex flex-col h-full relative">
    {headerRight && <div className="absolute top-4 right-4 md:top-6 md:right-6">{headerRight}</div>}
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2 max-w-[70%]">
        {Icon && <Icon className="text-[#393939] w-5 h-5 shrink-0" />}
        <h3 className="font-bold font-glacial text-[16px] md:text-[18px] truncate">{title}</h3>
        {subtitle && <span className="text-[#A3A3A3] font-glacial text-[14px] md:text-[16px] hidden sm:inline">| {subtitle}</span>}
      </div>
      {title === "Checklist" && (
        <div className="text-[12px] md:text-[14px] font-bold border-2 border-[#D1D9F2] rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[#393939] shrink-0">28%</div>
      )}
    </div>
    <div className="flex-1">{children}</div>
    {footerText && (
      <button onClick={onFooterClick} className="mt-4 flex items-center justify-center gap-2 text-[#A3A3A3] font-glacial text-[13px] md:text-[14px] hover:text-[#393939] transition-colors w-full border-t border-[#F7F6F1] pt-4">
        {footerText} <IconArrowRight className="w-4 h-4" />
      </button>
    )}
  </div>
);

const DashBoardHomeComponent: React.FC = () => {
  const { loadProfile, user } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCheckIn, setActiveCheckIn] = useState<{title: string, id: string} | null>(null);
  const [showResult, setShowResult] = useState<{score: number} | null>(null);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  const recursoPrincipal = Data[21]; 
  const step = user?.currentStage === 'LICENSE' ? 2 : user?.currentStage === 'POST_LICENSE' ? 3 : 1;
  const percentage = step === 1 ? 10 : step === 2 ? 50 : 100;

  const communityLinks: Record<string, string> = {
    "WhatsApp": "https://chat.whatsapp.com/GfP6Fb3ws154yPZVtKe9AG?mode=gi_t",
    "Instagram": "https://www.instagram.com/helloparentin?igsh=MXJ0OTEwMGRjeGkybA=="
  };

  const handleFinishCheckIn = (score: number) => {
    setActiveCheckIn(null);
    setShowResult({ score });
  };

  return (
    <div className="flex flex-col h-full max-w-[923px] font-sans text-[#393939] px-4 md:px-0"> 
      <div className="w-full">

        {activeCheckIn && (
          <CheckInModal 
            isOpen={true}
            title={activeCheckIn.title}
            categoryId={activeCheckIn.id}
            onClose={() => setActiveCheckIn(null)}
            onFinish={handleFinishCheckIn}
          />
        )}
        {showResult && (
          <ResultModal 
            score={showResult.score} 
            onClose={() => setShowResult(null)} 
          />
        )}

        
        <header className="flex justify-between items-center w-full mt-6 md:mt-2 mb-8">
          <div className="flex flex-col gap-1 pl-10 md:pl-0">
            <p className="text-[#A3A3A3] font-glacial text-[14px]">Te damos la bienvenida a Parent In</p>
            <h2 className="text-[#393939] font-lora font-semibold text-[32px] leading-tight">
              ¡Hola, {user?.name || "Paola"}!
            </h2>
            <p className="text-[#A3A3A3] font-glacial text-[14px]">Tu acompañamiento personalizado</p>
          </div>
          
          <div className="relative p-4 bg-white rounded-full shadow-sm cursor-pointer border border-[#F0F0F0] hover:scale-105 transition-all">
            <IconBell className="text-[#393939] w-6 h-6" />
            <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-[#9FC47C] border-2 border-white rounded-full"></div>
          </div>
        </header>

        <div className="mb-12">
          <ProgressStepperComponent currentStep={step} progressPercentage={percentage} />
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-[#F5EDED] border border-[#3939390D] rounded-4xl p-6 flex flex-col md:flex-row gap-5 items-center relative overflow-hidden">
            <div className="bg-white p-4 rounded-2xl shadow-sm shrink-0">
              <IconRecursos className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold font-glacial text-xs text-[#3939394D] uppercase tracking-wider">Recurso Destacado</h4>
                  <button onClick={() => setIsExpanded(!isExpanded)} className="text-[13px] font-bold text-[#393939] flex items-center gap-1">
                    {isExpanded ? "Ver menos" : "Ver más"} 
                    <IconArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? '-rotate-90' : ''}`}/>
                  </button>
              </div>
              <h5 className="font-bold font-glacial text-[18px]">{recursoPrincipal.titulo}</h5>
              <p className={`text-[14px] text-[#393939]/80 leading-relaxed mt-1 ${!isExpanded && 'line-clamp-1'}`}>
                  {Array.isArray(recursoPrincipal.contenido) ? recursoPrincipal.contenido[0] : recursoPrincipal.contenido}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Checklist" subtitle="Pre Licencia" footerText="Ver tareas (11 más)" onFooterClick={() => navigate("/dashboard/checklist")} icon={IconChecklist}>
              <div className="flex flex-col gap-3">
                {[
                  { t: "Agendar la primer sesion de coaching.", d: "5 min" },
                  { t: "Confirmar con RR.HH. elegibilidad.", d: "60 min" },
                  { t: "Identificar quién asumirá tareas.", d: "30 min" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-center p-4 bg-[#EDF0F9] rounded-2xl border border-[#D1D9F233]">
                    <div className="w-5 h-5 rounded-full border-2 border-[#393939] shrink-0" />
                    <div className="flex flex-col flex-1">
                      <p className="text-[13px] font-bold font-glacial text-[#393939] line-clamp-1">{item.t}</p>
                      <div className="flex items-center justify-end gap-1 text-[#A3A3A3]">
                        <IconTimer className="w-3.5 h-3.5" />
                        <span className="text-[12px]">{item.d}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Check In" subtitle="Semanal" footerText="Completar autoevaluaciones" onFooterClick={() => setActiveCheckIn({title: 'Trabajo', id: 'Trabajo'})} icon={IconCheckIn} headerRight={<CircularProgress percentage={33}><IconBabyStatus className="w-7 h-7 text-[#9FC47C]" /></CircularProgress>}>
              <div className="flex flex-col gap-3">
                <p className="text-[13px] md:text-[14px] text-[#3939394D] font-glacial -mt-2 mb-1">¿Cómo te sientes hoy?</p>
                {[
                  { title: 'Trabajo', id: 'Trabajo', icon: IconTrabajo }, { title: 'Hogar', id: 'Hogar', icon: IconHogar }, { title: 'Bienestar', id: 'Bienestar', icon: IconEmocionPlus }
                ].map((item, i) => (
                  <div key={i} onClick={() => setActiveCheckIn({title: item.title, id: item.id})} className="flex gap-2 w-full group cursor-pointer">
                    <div className="flex-1 h-20 md:h-[90px] p-4 bg-[#F5F7F1] rounded-[15px] flex items-center transition-all group-hover:bg-[#9FC47C1A]">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#393939]" />
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold font-glacial text-[#393939]">{item.title}</span>
                          <div className="flex items-center gap-1 text-[#A3A3A3]"><IconTimer className="w-3 h-3" /><span className="text-[12px]">1 min</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[50px] md:w-[60px] bg-[#F7F6F1] rounded-[15px] flex items-center justify-center transition-all group-hover:bg-[#9FC47C1A]">
                      <IconArrowRight className="w-5 h-5 text-[#393939]" />
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Comunidad" subtitle="Red de apoyo" footerText="Explorar comunidad" onFooterClick={() => navigate("/dashboard/community")} icon={IconComunidad}>
              <div className="flex flex-col gap-3">
                {[{ n: "WhatsApp", d: "Argentina" }, { n: "Instagram", d: "América Latina" }].map((group, i) => (
                  <a key={i} href={communityLinks[group.n]} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-[#F7F6F1] rounded-2xl hover:bg-[#F0F0F0] transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={FlowerIcon} className="w-9 h-9 rounded-full bg-[#D1D9F2] p-1" alt="group" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold font-glacial text-[#393939]">{group.n}</span>
                        <span className="text-[12px] text-[#A3A3A3]">{group.d}</span>
                      </div>
                    </div>
                    <IconInfoCircle className="text-[#393939] w-5 h-5" />
                  </a>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Agenda" subtitle="Profesionales" footerText="Ver más" onFooterClick={() => navigate("/dashboard/agenda")} icon={IconAgenda}>
              <div className="flex flex-col gap-3">
                {[{ n: "Lic. Lila Munilla", p: "Puericultora" }, { n: "Lic. Valentina Stefano", p: "Psicóloga" }].map((pro, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#F7F6F1] rounded-2xl">
                    <div className="flex items-center gap-3">
                      <img src={AvatarPlaceholder} alt="Pro" className="w-9 h-9 rounded-full object-cover bg-gray-200" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold font-glacial text-[#393939]">{pro.n}</span>
                        <span className="text-[12px] text-[#A3A3A3]">{pro.p}</span>
                      </div>
                    </div>
                    <IconInfoCircle className="text-[#393939] w-5 h-5" />
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHomeComponent;