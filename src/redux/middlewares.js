import { logOut } from "./slices/authSlice";
import { persistor } from "./store";

// HOF
export const logoutMiddleware = () => {
    return (next) => {
        return (action) => {
            if (action.type === logOut.type) {
                persistor.purge();
            }

            return next(action);
        };
    };
};
