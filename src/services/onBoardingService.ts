import api from "./api";


export const submitOnboarding = async (userType: string | null, answers: Record<string, any>) => {
    const data = { userType, answers };
    let response = null;
    switch(userType) {
        case 'firstSteps':
            response = await api.post("/onboarding/start", data);
            break;
        case 'parental':
            response = await api.post("/onboarding/parental", data);
            break;
        case 'preLicense':
        case 'license':
        case 'postLicense':
            response = await api.put("/onboarding/stage-details", data);
            response = await api.put("/onboarding/learning-topics", data);
            break;
        default:
            throw new Error("Tipo de usuario no reconocido para el onboarding");
    }
    return response.data;

}

// export const submitOnboardingFirstSteps = async (userType: string, answers: Record<string, any>) => {
//     const data = { userType, answers };

//     const response = await api.post("/onboarding/start", data);
    
//     return response.data;
// };

// export const submitOnboardingParentalFlow = async (userType: string, answers: Record<string, any>) => {};

// export const submitOnboardingParentalFlowPreLicense = async (userType: string, answers: Record<string, any>) => {};

// export const submitOnboardingParentalFlowLicense = async (userType: string, answers: Record<string, any>) => {};

// export const submitOnboardingParentalFlowPostLicense = async (userType: string, answers: Record<string, any>) => {};
