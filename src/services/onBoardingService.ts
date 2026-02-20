import api from "./api";


export const submitOnboarding = async (userTypeStore: string | null, answers: Record<string, any>, url?: string) => {
    
    let response = null;
    switch(userTypeStore) {
        case 'commonSteps':
            response = await api.post("/onboarding/start", answers);
            break;
        case 'parental':
            response = await api.post("/onboarding/parental", answers);
            break;
        case 'preLicencia':
        case 'licencia':
        case 'postLicencia':
            response = await api.put("/onboarding/stage-details", answers);
            break;
        case 'organization':
            response = await api.post(url || "", answers);
            break;
        case 'professional':
            response = await api.post("/onboarding/professional/complete", answers);
            break;
        default:
            throw new Error("Tipo de usuario no reconocido para el onboarding");
    }
    return response.data;

}
