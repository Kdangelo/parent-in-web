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


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'onboarding', element: <OnboardingPage /> },
            { path: 'onboarding/steps', element: <OnboardingFlowEngine /> },
            {
                path: 'dashboard',
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <div>Dashboard Home</div> },
                    { path: 'resources', element: <div>Resources</div> },
                    { path: 'checklist', element: <div>Checklist</div> },
                    { path: 'checkin', element: <div>Check In</div> },
                    { path: 'community', element: <div>Community</div> },
                    { path: 'agenda', element: <div>Agenda</div> },
                    { path: 'settings', element: <div>Settings</div> }
                ]

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