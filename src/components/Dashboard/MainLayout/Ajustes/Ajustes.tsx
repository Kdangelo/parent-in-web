import { useState } from "react";
import { IconBell, IconUser, IconShield, IconBellSimple, IconLink } from "../../../Icons/Icons";
import { TabCuenta } from "./TabCuenta";
import { TabPrivacidad } from "./TabPrivacidad";
import { TabNotificaciones } from "./TabNotificaciones";
import { TabConexiones } from "./TabConexiones";

export default function Ajustes() {
  const [activeTab, setActiveTab] = useState("Cuenta");
  const [dateFormat, setDateFormat] = useState("dd/mm/aaaa");

  const sharedStyles = {
    inputContainer: "relative bg-[#F9F9F7] border border-[#3939391A] rounded-[12px] p-3 flex flex-col justify-center h-[52px]",
    label: "text-[14px] md:text-[16px] text-[#393939] font-glacial font-semibold leading-[140%] mb-2 block",
    value: "text-[14px] md:text-[16px] text-[#3939394D] font-glacial font-normal outline-none bg-transparent w-full pr-8",
    editIcon: "absolute right-3 top-1/2 -translate-y-1/2 opacity-30 w-5 h-5 cursor-pointer",
    sectionTitle: "text-[#393939] font-lora font-semibold text-[20px] md:text-[24px] leading-[120%] tracking-[-0.02em] mb-6 md:mb-8",
  };

  const tabs = [
    { id: "Cuenta", label: "Mi cuenta", icon: <IconUser className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: "Privacidad", label: "Privacidad", icon: <IconShield className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: "Notificaciones", label: "Notificaciones", icon: <IconBellSimple className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: "Conexiones", label: "Conexiones", icon: <IconLink className="w-4 h-4 md:w-5 md:h-5" /> }
  ];

  return (
    <div className="flex flex-col h-full max-w-[923px] font-sans text-[#393939] px-4 md:px-0">
      <header className="flex justify-between items-start w-full mt-6 md:mt-0 mb-8">
        <div className="flex flex-col gap-1 pl-10 md:pl-0">
          <h2 className="text-[#393939] font-lora font-semibold text-[28px] md:text-[32px] leading-tight">Ajustes</h2>
        </div>
        <div className="relative p-2 md:p-3 bg-white rounded-full shadow-sm cursor-pointer border border-[#F0F0F0] shrink-0">
          <IconBell className="w-[22px] h-[24px] md:w-[27px] md:h-[29px]" />
          <div className="absolute top-1 right-1 w-[10px] h-[10px] bg-[#9FC47C] border-2 border-white rounded-full" />
        </div>
      </header>

      {/* TABS */}
      <div className="flex flex-nowrap items-center gap-1.5 md:gap-3 mb-8 md:mb-10 w-full overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              /* Distribución equitativa y reducción forzada */
              flex-1 min-w-0 
              
              /* Estilos visuales */
              flex items-center justify-center gap-1.5 md:gap-[10px]
              px-2 md:px-4 h-[45px] md:h-[48px]
              rounded-full border transition-all duration-300
              
              ${activeTab === tab.id 
                ? "bg-[#393939] text-white border-[#393939] shadow-md" 
                : "bg-white text-[#393939] border-[#3939394D] shadow-sm hover:border-[#393939]"
              }
            `}
          >
            <span className="shrink-0">{tab.icon}</span>
            <span className="text-[11px] sm:text-[13px] md:text-[14px] font-glacial font-medium truncate uppercase md:normal-case">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <main className="flex flex-col gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === "Cuenta" && <TabCuenta dateFormat={dateFormat} setDateFormat={setDateFormat} styles={sharedStyles} />}
        {activeTab === "Privacidad" && <TabPrivacidad styles={sharedStyles} />}
        {activeTab === "Notificaciones" && <TabNotificaciones styles={sharedStyles} />}
        {activeTab === "Conexiones" && <TabConexiones styles={sharedStyles} />}
      </main>
    </div>
  );
}