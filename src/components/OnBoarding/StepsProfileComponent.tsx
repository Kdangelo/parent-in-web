import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { userType } from "../../constants/usersType";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";



const StepsProfileComponent: React.FC = () => {
  const totalSteps = 6; // Suponiendo que hay 6 pasos en total
  const [currentStep, setCurrentStep] = useState(1);

  const {setUserTypeStore, userTypeStore} = useAuth();
  const navigate = useNavigate();

  const [selectedBirthday, setSelectedBirthday] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('');

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };


  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedBirthday !== '';
      case 2:
        return selectedGenre.length > 0;
      case 3:
        return selectedCountry.length > 0;
      case 4:
        return selectedCity.length > 0;
      case 5:
        return selectedPhone.length > 0;
      case 6:
        return selectedUserType.length > 0;
      case 7:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    
    setUserTypeStore(selectedUserType);

    //post al backend con los datos del formulario
    console.log({birthday: selectedBirthday,
      genre: selectedGenre,
      country: selectedCountry,
      city: selectedCity,
      phone: selectedPhone,
      userType: selectedUserType});
    
    alert('Formulario enviado: ' + JSON.stringify({
      birthday: selectedBirthday,
      genre: selectedGenre,
      country: selectedCountry,
      city: selectedCity,
      phone: selectedPhone,
      userType: selectedUserType,
    }));

 
    navigate("/onboarding/steps");
    
  }

  return (
    <div className="fixed inset-0 bg-[#F7F6F1] flex flex-col">
      <div className="w-full px-4 pt-4">
        <div className="w-full h-1 bg-[#393939] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#C5D0EC]"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      </div>
      {currentStep > 1 && (
        <div className="absolute top-16 left-4">
          <button
            onClick={handleBack}
            className="flex items-center w-12 h-12 border border-black gap-2 px-3 py-2 rounded-full text-black hover:bg-zinc-300 transition-all text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {/* Aquí iría el contenido del paso actual */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm text-center"
          >
            {currentStep === 1 && (
              <div>
                <h1 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
                  ¿Cuál es tu fecha de nacimiento?
                </h1>
                <input className="border rounded-lg text-xl sm:text-2xl md:text-3xl p-3" type="date" name="birthday" id="" onChange={(e) => setSelectedBirthday(e.target.value)} value={selectedBirthday} />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h1 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
                  ¿Con qué género te identificas?
                </h1>
                <select
                  className="border px-6 py-3 rounded-xl font-medium transition-colors text-base sm:text-lg md:text-xl"
                  name="genre"
                  id=""
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  value={selectedGenre}
                >
                  <option>Sleccione una opción</option>
                  <option value="female">Femenino</option>
                  <option value="male">Masculino</option>
                  <option value="noAnswer">Prefiero no decirlo</option>
                </select>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h1 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
                  ¿En qué país te encuentas actualmente?
                </h1>
                <input
                  className="border rounded-lg text-xl sm:text-2xl md:text-3xl p-3"
                  type="text"
                  name="country"
                  id=""
                  placeholder="País de residencia"
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  value={selectedCountry}
                />
              </div>
            )}
            {currentStep === 4 && (
              <div>
                <h1 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
                  ¿En qué ciudad vives?
                </h1>
                <input
                  className="border rounded-lg text-xl sm:text-2xl md:text-3xl p-3"
                  type="text"
                  name="city"
                  id=""
                  placeholder="Ciudad de residencia"
                  onChange={(e) => setSelectedCity(e.target.value)}
                  value={selectedCity}
                />
              </div>
            )}
            {currentStep === 5 && (
              <div>
                <h1 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
                  ¿Cuál es tu número de contacto?
                </h1>
                <input
                  className="border rounded-lg text-xl sm:text-2xl md:text-3xl p-3"
                  type="text"
                  name="phone"
                  id=""
                  placeholder="Celular de contacto"
                  onChange={(e) => setSelectedPhone(e.target.value)}
                  value={selectedPhone}
                />
              </div>
            )}

            {currentStep === 6 && (
              <div>
                <h1 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
                  ¿Como te gustaría involucrarte con Parent In?
                </h1>
                <div className="flex flex-col gap-4 items-center">
                  {userType.map(option => (
                    <button
                      onClick={() => setSelectedUserType(option.value)}
                      className={`px-6 py-3 rounded-xl font-medium transition-colors text-base sm:text-lg md:text-xl ${
                        selectedUserType === option.value
                          ? "bg-blue-500 text-white"
                          : "bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Botón siguiente / submit */}
            <div className="mt-6 flex justify-center">
              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className={`inline-flex px-6 py-3 rounded-xl font-medium transition-all text-base sm:text-lg md:text-xl ${
                    canProceed()
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                  }`}
                >
                  Siguiente
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="inline-flex px-6 py-3 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all text-base sm:text-lg md:text-xl"
                >
                  Submit
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StepsProfileComponent;
// function setUserType(arg0: string) {
//   throw new Error("Function not implemented.");
// }

