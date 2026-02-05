import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import ProgressStepperComponent from "./ui/ProgressStepperComponent";

const DashBoardHomeComponent: React.FC =  () => {
    const { loadProfile, user } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            await loadProfile();
        };
        fetchProfile();
    }, [loadProfile]);
    
    const step = user?.currentStage === 'PRE_LICENSE' ? 1 : user?.currentStage === 'LICENSE' ? 2 : 3;  
    let percentage;
    switch(step) {
        case 1:
            percentage = 10;
            break;
        case 2:
            percentage = 50;
            break;
        case 3:
            percentage = 100;
            break;
        default:
            percentage = 0;
    }
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
            ¡Hola, {user?.name || "Usuario"}!
        </h1>
        <p className="text-[#A3A3A3] text-[13px] md:text-[15px] font-medium leading-none">
            Tu acompañamiento personalizado
        </p>
        <ProgressStepperComponent currentStep={step} progressPercentage={percentage} />
        </div>

  );
};

export default DashBoardHomeComponent;
