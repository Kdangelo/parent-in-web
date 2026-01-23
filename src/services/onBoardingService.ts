import api from "./api";


export const submitOnboarding = async (userTypeStore: string | null, answers: Record<string, any>) => {
    
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
            //console.log("stage-details",response);
            
            // response = await api.put("/onboarding/learning-topics", answers);
            // console.log("learning-topics",response);
            
            break;
        default:
            throw new Error("Tipo de usuario no reconocido para el onboarding");
    }
    return response.data;

}
