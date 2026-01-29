import React from "react";
import ProgressStepperComponent from "./ui/ProgressStepperComponent";

const DashBoardHomeComponent: React.FC = () => {
  return (
    
        <div
        className="absolute mt-12 md:relative md:top-0 md:left-0 flex flex-col justify-center"
        style={{
            width: "413px",
            height: "76px",
            top: "50px",
            left: "109px",
            opacity: 1,
        }}
        >
        <span className="text-[#A3A3A3] text-[13px] md:text-[15px] font-medium leading-none">
            Te damos la bienvenida a Parent In
        </span>
        <h1 className="text-[32px] md:text-5xl font-bold text-[#393939] font-serif leading-tight">
            ¡Hola, Paola!
        </h1>
        <p className="text-[#A3A3A3] text-[13px] md:text-[15px] font-medium leading-none">
            Tu acompañamiento personalizado
        </p>
        <ProgressStepperComponent currentStep={1} progressPercentage={33} />
        </div>

  );
};

export default DashBoardHomeComponent;
