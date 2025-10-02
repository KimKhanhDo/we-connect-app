import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="bg-dark-100 flex h-screen items-center justify-center">
            <div className="h-fit w-[450px] bg-white px-8 py-10">
                <img
                    className="mx-auto mb-6"
                    src="/we-connect-logo.png"
                    alt="logo"
                />
                <Suspense fallback={<p>Loading</p>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
}
export default AuthLayout;
