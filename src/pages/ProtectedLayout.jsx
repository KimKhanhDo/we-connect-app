import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useGetAuthUserQuery } from "@/services/rootApi";
import { saveUserInfo } from "@/redux/slices/authSlice";
import Header from "@/components/Header";

function ProtectedLayout() {
    const dispatch = useDispatch();
    const response = useGetAuthUserQuery(); // Query TỰ ĐỘNG gọi API khi component mount. Ngay khi dòng này chạy → RTK Query tự động fetch!

    useEffect(() => {
        // Khi API trả về thành công lưu user info vào Redux
        if (response.isSuccess) dispatch(saveUserInfo(response.data));
    }, [response, dispatch]);

    // ⏳ Case 1: Đang loading (fetch lần đầu) - isLoading chỉ set true ở lần query đầu tiên
    if (response.isLoading) return <p>Loading...</p>;

    // ✅ Case 2: Đã có data → Render protected content
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
export default ProtectedLayout;
