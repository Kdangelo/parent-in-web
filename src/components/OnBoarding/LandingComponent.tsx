import React from "react";
import Flor1 from "../../assets/flor1.png";

const LandingComponent: React.FC = () => {
  const onStart = () => {
    window.location.href = "/onboarding/steps/user";
  };

  return (
    <section className="min-h-screen flex items-center font-lora justify-center bg-[#F7F9FC] px-4">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        {/* Logo / Marca */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-1">
            <span className="text-3xl sm:text-4xl font-semibold text-[#222222] tracking-tight">
              Parent
            </span>
            {/* El "in" con flor sobre la i */}
            <div className="flex items-center gap-0.5">
              {/* Flor sencilla como placeholder, se puede reemplazar por un SVG o imagen */}
              <span className="w-3 h-3 sm:w-8 sm:h-8 relative flex items-center justify-center ml-0.5 mb-1">
                {/* <span className="absolute inset-0 rounded-full border-2 border-white" /> */}
                <img src={Flor1} alt="Flor sobre la i" />
              </span>
              <span className="text-3xl sm:text-4xl font-semibold text-[#222222] tracking-tight">
                i
              </span>
              <span className="text-3xl sm:text-4xl font-semibold text-[#222222] tracking-tight">
                n
              </span>
            </div>
          </div>
        </div>

        {/* Contenido de bienvenida */}
        <div className="space-y-4 mb-16">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#222222]">
            ¡Te damos la bienvenida!
          </h1>
          <p className="text-sm italic font-bold sm:text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
            Queremos conocerte mejor para poder acompañarte
          </p>
        </div>

        {/* Botón principal */}
        <button
          type="button"
          onClick={onStart}
          className="
            w-full max-w-xs 
            bg-[#1F7AE0] hover:bg-[#185fb3] 
            text-white font-medium 
            py-3 sm:py-3.5 
            rounded-full 
            text-sm sm:text-base 
            shadow-md shadow-blue-200
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F7AE0]
          "
        >
          Comenzar
        </button>
      </div>
    </section>
  );
};

export default LandingComponent;
