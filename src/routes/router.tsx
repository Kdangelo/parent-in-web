import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OnboardingPage from "../pages/OnboardingPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";

import OnboardingFlowEngine from "../components/OnBoarding/OnboardingFlowEngine";
import DashboardLayout from "../components/Dashboard/MainLayout/DashboardLayout";
import DashBoardHomeComponent from "../components/Dashboard/DashBoardHomeComponent";
import ProtectedRoute from "./ProtectedRoute";
import CheckIn from "../components/Dashboard/MainLayout/CheckIn";
import Checklist from "../components/Dashboard/MainLayout/Checklist";
import Agenda from "../components/Dashboard/MainLayout/Agenda";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <LoginPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'verification', element: <EmailVerificationPage /> },
            

            {
                element: <ProtectedRoute />,
                children: [
                    // Protected routes can be added here
                    { path: 'onboarding', element: <OnboardingPage /> },
                    { path: 'onboarding/steps', element: <OnboardingFlowEngine /> },
                    {
                        path: 'dashboard',
                        element: <DashboardLayout />,
                        children: [
                            { index: true, element: <DashBoardHomeComponent /> },
                            { path: 'resources', element: <div>Resources</div> },
                            { path: 'checklist', element: <Checklist /> },
                            { path: 'checkin', element: <CheckIn /> },
                            { path: 'community', element: <div>Community</div> },
                            { path: 'agenda', element: <Agenda /> },
                            { path: 'settings', element: <div>Settings</div> }
                        ]
                    },
                ]
            },
            //404 Not Found Route
            { path: '*', element: <NotFoundPage /> }
        ]
    }
]);

export default router;