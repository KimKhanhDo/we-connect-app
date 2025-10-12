import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
// Supports weights 100-900
import "@fontsource-variable/public-sans";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "@/redux/slices/snackBarSlice";

function RootLayout() {
    const dispatch = useDispatch();
    const { open, type, message } = useSelector((state) => state.snackbar);

    return (
        <div className="text-dark-200">
            {/* For lazing loading */}
            <Suspense fallback={<p>Loading</p>}>
                <Outlet />
            </Suspense>

            {/* Snackbar */}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => dispatch(closeSnackbar())}
            >
                <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
export default RootLayout;
