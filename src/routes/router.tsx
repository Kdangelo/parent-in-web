import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OnboardingPage from "../pages/OnboardingPage";
import DashboardPage from "../pages/DashboardPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";


import StepsProfileComponent from "../components/OnBoarding/StepsProfileComponent";
import OnboardingFlowEngine from "../components/OnBoarding/OnboardingFlowEngine";


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
                path: 'onboarding/profile',
                element: <StepsProfileComponent />
            },
            {
                path: 'onboarding/steps',
                element: <OnboardingFlowEngine />
            },
            {
                path: 'dashboard',
                element: <DashboardPage />
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