import { Suspense } from "react";
import { Outlet } from "react-router-dom";
// Supports weights 100-900
import "@fontsource-variable/public-sans";

function RootLayout() {
    return (
        <div>
            {/* For lazing loading */}
            <Suspense fallback={<p>Loading</p>}>
                <Outlet />
            </Suspense>
        </div>
    );
}
export default RootLayout;
