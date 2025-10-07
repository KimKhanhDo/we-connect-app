import { ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import RootLayout from "@pages/RootLayout.jsx";
import ModalProvider from "@context/ModalProvider";
import theme from "@/configs/muiConfig";
import RegisterPage from "@/pages/auth/RegisterPage";
import AuthLayout from "@/pages/auth/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import OTPVerifyPage from "@/pages/auth/OTPVerifyPage";
import ProtectedLayout from "@/pages/ProtectedLayout";
import MessagePage from "@/pages/MessagePage";

// Lazy import
const HomePage = lazy(() => import("@pages/HomePage.jsx"));

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />,
                    },
                    {
                        path: "/messages",
                        element: <MessagePage />,
                    },
                ],
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
    <Provider store={store}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
            <ThemeProvider theme={theme}>
                <ModalProvider>
                    <RouterProvider router={router} />
                </ModalProvider>
            </ThemeProvider>
        </PersistGate>
    </Provider>,
);
