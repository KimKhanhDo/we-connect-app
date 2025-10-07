import { Link, Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useGetAuthUserQuery } from "@/services/rootApi";
import { saveUserInfo } from "@/redux/slices/authSlice";

function ProtectedLayout() {
    const dispatch = useDispatch();
    const response = useGetAuthUserQuery();
    console.log("🚀 ~ ProtectedLayout ~ response:", response);

    useEffect(() => {
        if (response.isSuccess) dispatch(saveUserInfo(response.data));
    }, [response, dispatch]);

    // Nếu ko muốn dùng useEffect & navigate thì có thể return Navigate ngay tại đây
    if (response.error?.code === 401) return <Navigate to="/login" />;

    if (response.isLoading) return <p>Loading...</p>;

    return (
        <div>
            <Link to="/">Home Page</Link>
            <Link to="/messages">Message Page</Link>
            <Outlet />
        </div>
    );
}
export default ProtectedLayout;
