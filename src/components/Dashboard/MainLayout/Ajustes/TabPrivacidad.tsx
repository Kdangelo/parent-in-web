import { useState } from "react";
import { IconPlus, IconEditPen, IconPasswordSmall } from "../../../Icons/Icons";
import { ModalModificarPassword } from "../../../../components/Dashboard/MainLayout/Modal/ModalModificarPassword";
import { ModalGuardarDatos } from "../../../../components/Dashboard/MainLayout/Modal/ModalGuardarDatos";

export const TabPrivacidad = ({ styles }: { styles: any }) => {
  const initialSettings = {
    findMe: "Todos",
    profileView: "Visible",
    hidePhoto: "Desactivado"
  };

  const [findMe, setFindMe] = useState(initialSettings.findMe);
  const [profileView, setProfileView] = useState(initialSettings.profileView);
  const [hidePhoto, setHidePhoto] = useState(initialSettings.hidePhoto);
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleReset = () => {
    setFindMe(initialSettings.findMe);
    setProfileView(initialSettings.profileView);
    setHidePhoto(initialSettings.hidePhoto);
  };

  const CustomRadio = ({ label, selected, onClick }: any) => (
    <label className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-all ${selected ? "border-[#C5D0EC]" : "border-[#3939391A]"}`}>
        {selected && <div className="w-[12px] h-[12px] bg-[#C5D0EC] rounded-full" />}
      </div>
      <span className={`text-[14px] md:text-[15px] font-glacial ${selected ? "text-[#393939]" : "text-[#3939394D]"}`}>
        {label}
      </span>
    </label>
  );

  return (
    <>
      <section>
        <h3 className={styles.sectionTitle}>Privacidad y permisos</h3>
        <div className="bg-white rounded-[24px] border border-[#3939391A] p-6 md:p-8 shadow-sm flex flex-col gap-10">
          <div>
            <label className={styles.label}>¿Quién puede encontrarme en Parent In?</label>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-6 mt-2">
              {["Todos", "Solo personas transitando mi etapa", "Nadie"].map(opt => (
                <CustomRadio key={opt} label={opt} selected={findMe === opt} onClick={() => setFindMe(opt)} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <label className={styles.label}>Modo de visualización</label>
              <div className="flex gap-6 mt-2">
                {["Visible", "Anónimo"].map(opt => (
                  <CustomRadio key={opt} label={opt} selected={profileView === opt} onClick={() => setProfileView(opt)} />
                ))}
              </div>
            </div>
            <div>
              <label className={styles.label}>Ocultar mi foto de perfil</label>
              <div className="flex gap-6 mt-2">
                {["Desactivado", "Activado"].map(opt => (
                  <CustomRadio key={opt} label={opt} selected={hidePhoto === opt} onClick={() => setHidePhoto(opt)} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <label className={styles.label}>Cuentas bloqueadas</label>
              <p className="text-[14px] font-glacial text-[#3939394D]">No bloqueaste a ninguna cuenta aún</p>
            </div>
            <div>
              <label className={styles.label}>Silenciar temas o palabras</label>
              <button className="flex items-center gap-1 text-[#C5D0EC] font-glacial font-semibold hover:opacity-70 transition-opacity">
                <IconPlus className="w-4 h-4" /> 
                <span className="text-[15px]">Añadir tema/palabra</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
  <h3 className={styles.sectionTitle}>Seguridad</h3>
  <div className="bg-white rounded-[24px] border border-[#3939391A] p-6 md:p-8 shadow-sm">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      
      <div className="flex flex-col">
        <label className={styles.label}>Contraseña</label>
        <div className="relative bg-[#F9F9F7] border border-[#3939390D] rounded-[10px] p-3 h-[48px] flex items-center">
          <div className="flex items-center w-full">
            <IconPasswordSmall className="opacity-40" />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label className={styles.label}>Modificar contraseña</label>
        <div 
          onClick={() => setIsPasswordModalOpen(true)} // Activa el modal aquí
          className="relative bg-[#F9F9F7] border border-[#3939390D] rounded-[10px] p-3 h-[48px] flex items-center cursor-pointer group hover:border-[#C5D0EC] transition-all"
        >
          <input 
            type="text" 
            placeholder="-" 
            className="bg-transparent text-[#3939394D] w-full outline-none font-glacial cursor-pointer" 
            readOnly 
          />
          <IconEditPen className="w-4 h-4 opacity-20 absolute right-3 group-hover:opacity-60 transition-opacity" />
        </div>
      </div>

    </div>
  </div>
</section>

      <div className="mt-12 flex flex-col md:flex-row justify-end items-center gap-6 md:gap-10">
        <button 
          onClick={handleReset}
          className="font-glacial font-semibold text-[#767D8E] text-[16px] hover:text-[#393939] transition-colors"
        >
          Reestablecer
        </button>
        <button 
          onClick={() => setIsSaveModalOpen(true)}
          className="w-full md:w-[240px] h-[50px] bg-[#7D8495] text-white rounded-full font-glacial font-semibold text-[18px] shadow-sm hover:bg-[#6b7282] transition-all active:scale-95"
        >
          Guardar
        </button>
      </div>

      <ModalModificarPassword 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
      
      <ModalGuardarDatos 
        isOpen={isSaveModalOpen} 
        onClose={() => setIsSaveModalOpen(false)} 
        onConfirm={() => {
          setIsSaveModalOpen(false);
        }} 
      />
    </>
  );
};