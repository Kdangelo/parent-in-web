import api from "./api";


export const submitOnboarding = async (userTypeStore: string | null, answers: Record<string, any>) => {
    
    // const userType = answers['userType'];
    // const prentalStage = answers['parentalStage'] || null;

    let response = null;
    switch(userTypeStore) {
        case 'commonSteps':
            response = await api.post("/onboarding/start", answers);
            break;
        case 'parental':
            response = await api.post("/onboarding/parental", answers);
            break;
        case 'preLicense':
        case 'license':
        case 'postLicense':
            response = await api.put("/onboarding/stage-details", answers);
            response = await api.put("/onboarding/learning-topics", answers);
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
