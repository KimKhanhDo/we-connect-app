import { lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import "./index.css";
import RootLayout from "@pages/RootLayout.jsx";
import ModalProvider from "@context/ModalProvider";
import theme from "@/configs/muiConfig";
import RegisterPage from "@/pages/auth/RegisterPage";
import AuthLayout from "@/pages/auth/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import OTPVerifyPage from "./pages/auth/OTPVerifyPage";

// Lazy import
const HomePage = lazy(() => import("@pages/HomePage.jsx"));

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "/register",
                        element: <RegisterPage />,
                    },
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                    {
                        path: "/verify-otp",
                        element: <OTPVerifyPage />,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
        <ModalProvider>
            <RouterProvider router={router} />
        </ModalProvider>
    </ThemeProvider>,
);
