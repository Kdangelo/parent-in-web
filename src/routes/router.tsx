import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OnboardingPage from "../pages/OnboardingPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";

import OnboardingFlowEngine from "../components/OnBoarding/OnboardingFlowEngine";
import DashboardLayout from "../components/Dashboard/MainLayout/DashboardLayout";
import CheckIn from "../components/Dashboard/MainLayout/CheckIn"; //Borrar antes de subir


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'onboarding',
                element: <OnboardingPage />
            },
            {
                path: 'onboarding/steps',
                element: <OnboardingFlowEngine />
            },
            {
                path: 'dashboard',
                element: <DashboardLayout />,                
            },
            
            {
                path: 'verification',
                element: <EmailVerificationPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
]);

export default router;