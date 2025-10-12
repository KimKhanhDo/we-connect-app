import { logOut } from "./slices/authSlice";
import { persistor } from "./store";

// HOF
export const logoutMiddleware = () => {
    return (next) => {
        return (action) => {
            /* Chặn action logOut và xóa localStorage trước khi đến reducer */
            if (action.type === logOut.type) {
                persistor.purge(); // Xóa "persist:root" khỏi localStorage
            }

            /* Cho action tiếp tục flow: middleware tiếp theo → reducer */
            return next(action);
        };
    };
};

/**
 * ============================================================
 * LOGOUT MIDDLEWARE - Xử lý side effect khi logout
 * ============================================================
 * Middleware này tự động xóa localStorage mỗi khi action logOut được dispatch
 *
 * Giải quyết vấn đề:
 * - Reducer phải là pure function (không được có side effects như localStorage)
 * - Component không phải gọi persistor.purge() thủ công ở mọi nơi
 * - Tập trung logic xóa localStorage vào 1 nơi duy nhất
 *
 * ============================================================
 * LUỒNG HOẠT ĐỘNG:
 * ============================================================
 * 1. Component: dispatch(logOut())
 * 2. Middleware này chặn action
 * 3. Check: action.type === "auth/logOut"? → YES: persistor.purge()
 * 4. return next(action) → action tiếp tục đến reducer
 * 5. Reducer: reset state về initialState
 * 6. Redux-persist: KHÔNG save gì (vì localStorage đã bị purge)
 *
 * ============================================================
 * TẠI SAO CẦN MIDDLEWARE?
 * ============================================================
 * ❌ Nếu gọi trong component: Phải lặp lại code ở mọi nơi
 * ❌ Nếu gọi trong reducer: Vi phạm pure function (side effect)
 * ✅ Middleware: Tập trung, tự động, đúng timing
 * ============================================================
 */

/**
 * Component dispatch(logOut())
    │
    ▼
┌─────────────────────┐
│   Action Object     │
│   {type: "logOut"}  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────┐
│   Middleware Chain       ⭐ │  ← BẮT action ở đây!
│   - logoutMiddleware        │
│     if (logOut) {           │
│       persistor.purge() ✅  │  ← Xóa localStorage
│     }                       │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────┐
│   Reducer           │
│   return initial    │  ← Pure function, không side effect
└─────────────────────┘
 */

/** */
