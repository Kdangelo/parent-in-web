import { useState, useEffect, useRef } from "react";
import { IconEditPen, IconTrash } from "../../../Icons/Icons";
import { ModalEliminarCuenta } from "../../../../components/Dashboard/MainLayout/Modal/ModalEliminarCuenta";
import { ModalGuardarDatos } from "../../../../components/Dashboard/MainLayout/Modal/ModalGuardarDatos";
import fotoDefault from "../../../../assets/Ellipse 63.png";

export const TabCuenta = ({ dateFormat, setDateFormat, styles }: any) => {
  const initialData = {
    email: "paolacrespo@gmail.com",
    phone: "280 4577898",
    nacimiento: "12/09/1988",
    genero: "Mujer",
    familia: "Tipo de familia",
    hijos: "2",
    laboral: "Situación laboral",
    organizacion: "Tipo de organización",
    rol: "Rol/Posición actual",
    provincia: "Mendoza, Gran Mendoza",
    zonaHoraria: "Buenos Aires, Argentina",
    localizacion: "Ciudad de Córdoba, Córdoba, Argentina",
  };

  const [formData, setFormData] = useState(initialData);
  const [profileImage, setProfileImage] = useState(fotoDefault); // Estado para la imagen
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditPhotoClick = () => {
    fileInputRef.current?.click();
  };

  // Función para manejar el cambio de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  useEffect(() => {
    const parts = formData.nacimiento.match(/\d+/g);
    if (parts && parts.length === 3) {
      const yearIdx = parts.findIndex(p => p.length === 4);
      const a = parts[yearIdx];
      const rest = parts.filter((_, idx) => idx !== yearIdx);
      let newDate = "";
      if (dateFormat === "dd/mm/aaaa") newDate = `${rest[0]}/${rest[1]}/${a}`;
      else if (dateFormat === "mm/dd/aaaa") newDate = `${rest[1]}/${rest[0]}/${a}`;
      else if (dateFormat === "aaaa/dd/mm") newDate = `${a}/${rest[0]}/${rest[1]}`;
      setFormData(prev => ({ ...prev, nacimiento: newDate }));
    }
  }, [dateFormat]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialData);
    setDateFormat("dd/mm/aaaa");
    setProfileImage(fotoDefault);
  };

  const handleSaveConfirm = () => {
    console.log("Datos guardados:", formData, "Nueva foto:", profileImage);
    setIsSaveModalOpen(false);
  };

  return (
    <>
      <section>
        <h3 className={styles.sectionTitle}>Mi perfil</h3>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch">
          
          {/* Avatar Card */}
          <div className="flex flex-col items-center justify-center gap-3 w-full md:w-[260px] bg-white rounded-[25px] border border-[#3939391A] p-6 shadow-sm min-h-[220px]">
            <div className="relative">
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden bg-gray-100 border-2 border-[#F9F9F7]">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              
              <button 
                onClick={handleEditPhotoClick}
                className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-[#F0F0F0] hover:scale-110 transition-transform active:scale-95"
              >
                <IconEditPen className="w-4 h-4 text-[#393939]" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold text-[18px] font-glacial text-[#393939]">Paola Crespo</span>
            </div>
          </div>

          <div className="w-full md:flex-grow bg-white rounded-[24px] border border-[#3939391A] p-6 flex flex-col gap-6 shadow-sm justify-center">
            <div className="flex flex-col">
              <label className={styles.label}>Dirección de correo electrónico</label>
              <div className={styles.inputContainer}>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="text-[14px] md:text-[16px] text-[#393939] font-glacial font-normal outline-none bg-transparent w-full" />
                <IconEditPen className={styles.editIcon} />
              </div>
            </div>
            <div className="flex flex-col">
              <label className={styles.label}>Número de teléfono asociado</label>
              <div className={styles.inputContainer}>
                <div className="flex gap-2 items-center w-full">
                  <span className="text-[#3939394D] font-glacial text-[16px]">+54</span>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="text-[14px] md:text-[16px] text-[#393939] font-glacial font-normal outline-none bg-transparent w-full" />
                </div>
                <IconEditPen className={styles.editIcon} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <h3 className={styles.sectionTitle}>Datos</h3>
        <div className="bg-white rounded-[24px] border border-[#3939391A] p-5 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {[
              { label: "Fecha de nacimiento", name: "nacimiento" },
              { label: "Género", name: "genero" },
              { label: "Tipo de familia", name: "familia" },
              { label: "Cantidad de hijos", name: "hijos" },
              { label: "Situación laboral", name: "laboral" },
              { label: "Tipo de organización", name: "organizacion" },
              { label: "Rol/Posición actual", name: "rol" },
              { label: "Provincia y ciudad", name: "provincia" },
              { label: "Zona horaria", name: "zonaHoraria" },
              { label: "Localización", name: "localizacion" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className={styles.label}>{field.label}</label>
                <div className={styles.inputContainer}>
                  <input 
                    type="text" 
                    name={field.name}
                    value={(formData as any)[field.name]} 
                    onChange={handleChange}
                    className="text-[14px] md:text-[16px] text-[#393939] font-glacial font-normal outline-none bg-transparent w-full" 
                  />
                  <IconEditPen className={styles.editIcon} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-[#F0F0F0]">
            <label className={styles.label}>Formato de fecha</label>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4">
              {["dd/mm/aaaa", "mm/dd/aaaa", "aaaa/dd/mm"].map((format) => (
                <label key={format} className="flex items-center gap-3 cursor-pointer group" onClick={() => setDateFormat(format)}>
                  <div className={`relative w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${dateFormat === format ? "border-[#C5D0EC]" : "border-[#3939391A]"}`}>
                    {dateFormat === format && <div className="w-3 h-3 bg-[#C5D0EC] rounded-full" />}
                  </div>
                  <span className={`text-[15px] font-glacial ${dateFormat === format ? "text-[#393939]" : "text-[#3939394D]"}`}>
                    {format}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12 flex flex-col gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <button onClick={() => setIsDeleteModalOpen(true)} className="flex items-center justify-center gap-2 w-full md:w-[184px] h-[45px] bg-[#F8B3B3] text-[#393939] rounded-[12px] font-glacial font-semibold text-[16px] transition-all hover:brightness-95 active:scale-95">
            <IconTrash className="w-5 h-5" />
            Borrar cuenta
          </button>
          <p className="text-[13px] md:text-[14px] font-glacial text-[#3939394D]">La eliminación de tu cuenta es permanente y no se puede deshacer</p>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-6 md:gap-10">
          <button onClick={handleReset} className="font-glacial font-semibold text-[#767D8E] text-[16px] hover:text-[#393939] transition-colors">Reestablecer</button>
          <button onClick={() => setIsSaveModalOpen(true)} className="w-full md:w-[240px] h-[50px] bg-[#7D8495] text-white rounded-full font-glacial font-semibold text-[18px] shadow-sm hover:bg-[#6b7282] transition-all active:scale-95">Guardar</button>
        </div>
      </div>

      <ModalEliminarCuenta isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
      <ModalGuardarDatos isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} onConfirm={handleSaveConfirm} />
    </>
  );
};