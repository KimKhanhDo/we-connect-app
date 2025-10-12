import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // ↑ Đây là localStorage (trình duyệt)
import {
    persistReducer, // ⭐ Wrap reducer để persist
    persistStore, // ⭐ Tạo persistor
    // Actions của redux-persist (để ignore trong serializable check)
    FLUSH, // Ghi tất cả state pending vào storage
    REHYDRATE, // Khôi phục state từ storage
    PAUSE, // Tạm dừng persist
    PERSIST, // Bắt đầu persist
    PURGE, // Xóa toàn bộ persisted state
    REGISTER, // Đăng ký reducer với persist
} from "redux-persist";

import { rootApi } from "@/services/rootApi";
import authReducer from "@/redux/slices/authSlice";
import snackbarReducer from "@/redux/slices/snackbarSlice";
import settingsReducer from "@/redux/slices/settingsSlice";
import { logoutMiddleware } from "./middlewares";

// ⭐ BƯỚC 1: Combine reducers thành 1 reducer function
const rootReducer = combineReducers({
    auth: authReducer,
    snackbar: snackbarReducer,
    settings: settingsReducer,
    [rootApi.reducerPath]: rootApi.reducer,
});

// ⭐ BƯỚC 2: Config persist
const persistConfig = {
    key: "root", // Key lưu trong localStorage
    version: 1, // Version để migration
    storage, // Nơi lưu (localStorage)
    blacklist: [rootApi.reducerPath],
};

// ⭐ BƯỚC 3: Wrap rootReducer với persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ⭐ BƯỚC 4: Configure store
export const store = configureStore({
    reducer: persistedReducer, // Dùng persisted reducer

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                // QUAN TRỌNG: Ignore các actions của redux-persist
                ignoredActions: [
                    FLUSH, // Khi flush state
                    REHYDRATE, // Khi load từ storage
                    PAUSE, // Khi pause
                    PERSIST, // Khi bắt đầu persist
                    PURGE, // Khi xóa storage
                    REGISTER, // Khi register
                ],
            },
        }).concat(logoutMiddleware, rootApi.middleware); // Thêm RTK Query middleware
    },
});

// ⭐ BƯỚC 5: Export persistor
export const persistor = persistStore(store);
