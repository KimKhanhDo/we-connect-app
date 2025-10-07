import { logOut } from "@/redux/slices/authSlice";
// import { persistor } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,

    // getState được RTK Query tự động cung cấp
    // Đây là tham số thứ 2 của callback prepareHeaders
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
    },
});

const baseQueryWithForceLogout = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        api.dispatch(logOut());
        // await persistor.purge();
        window.location.href = "/login";
    }

    return result;
};

// API Slice
export const rootApi = createApi({
    reducerPath: "api",
    // fetchBaseQuery() bọc bên ngoài 1 fetch()
    baseQuery: baseQueryWithForceLogout,
    endpoints: (builder) => {
        return {
            register: builder.mutation({
                query: ({ fullName, email, password }) => {
                    return {
                        url: "/signup",
                        method: "POST",
                        body: { fullName, email, password },
                    };
                },
            }),

            login: builder.mutation({
                query: ({ email, password }) => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: { email, password },
                    };
                },
            }),

            verifyOTP: builder.mutation({
                query: ({ email, otp }) => {
                    return {
                        url: "/verify-otp",
                        method: "POST",
                        body: { email, otp },
                    };
                },
            }),

            getAuthUser: builder.query({
                query: () => "/auth-user", // Return string cho GET request đơn giản
            }),
        };
    },
});

// Export hooks để sử dụng trong components
// Convention: use[EndpointName]Mutation hoặc use[EndpointName]Query
export const {
    useRegisterMutation,
    useLoginMutation,
    useVerifyOTPMutation,
    useGetAuthUserQuery,
} = rootApi;

// ========== MUTATIONS ==========
// Mutations dùng cho các thao tác THAY ĐỔI dữ liệu (POST, PUT, PATCH, DELETE)
// - KHÔNG tự động gọi API khi component mount
// - Phải được trigger thủ công bởi user action (submit form, click button...)
// - Hook trả về: [mutationFunction, { data, isLoading, isError, error, isSuccess }]
// - Trong query function: return object { url, method, body, headers... }

// ========== QUERIES ==========
// Queries dùng cho các thao tác LẤY dữ liệu (GET)
// - TỰ ĐỘNG gọi API khi component mount (auto-fetching)
// - Hook trả về: { data, isLoading, isError, error, refetch... }
// - Trong query function: return string (URL) hoặc object { url, method, params... }
