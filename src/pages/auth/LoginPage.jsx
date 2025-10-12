import { Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import FormField from "@/components/FormField";
import TextInput from "@/components/FormInputs/TextInput";
import { useLoginMutation } from "@/services/rootApi";
import { openSnackbar } from "@/redux/slices/snackbarSlice";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Custom hook return array với 2 phần tử:
    //  - Phần tử thứ nhất là 1 function dùng để gọi API. Với mutation chúng ta ko thực hiện gọi API ngay mà phải có hành động nào đó từ phía người dùng (khác với query). Ở đây, user phải nhấn vào nút Login.
    const [login, { data = {}, isLoading, isSuccess, isError, error }] =
        useLoginMutation();

    // Tạo schema cho 1 object
    const formSchema = yup.object().shape({
        email: yup
            .string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Email is not valid",
            )
            .required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),

        // Khi kiểm soát việc thay đổi dữ liệu của input với value & onChange thì phải có default value
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(formData) {
        login(formData);
    }

    useEffect(() => {
        if (isError) {
            dispatch(
                openSnackbar({ type: "error", message: error?.data?.message }),
            );
        }

        if (isSuccess) {
            dispatch(openSnackbar({ message: data.message }));

            // - Chuyển đến trang /verify-otp
            // - Mang theo dữ liệu: { email: "user@gmail.com" }
            navigate("/verify-otp", {
                state: {
                    email: getValues("email"),
                },
            });
        }
    }, [
        dispatch,
        navigate,
        getValues,
        isError,
        error,
        isSuccess,
        data.message,
    ]);

    return (
        <div>
            <div className="text-dark-200">
                <p className="mb-2 text-2xl font-medium">
                    Welcome to WeConnect! 👋
                </p>
                <p className="mb-5 text-[0.9rem]">
                    Please sign in to your account and start the adventure
                </p>
            </div>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    name="email"
                    label="Email"
                    control={control}
                    error={errors["email"]}
                    Component={TextInput}
                />

                <FormField
                    name="password"
                    label="Password"
                    type="password"
                    control={control}
                    error={errors["password"]}
                    Component={TextInput}
                />

                <Button variant="contained" type="submit">
                    {isLoading && (
                        <CircularProgress size="16px" className="mr-1" />
                    )}
                    Sign in
                </Button>
            </form>
            <p className="mt-4">
                New on our platform?{" "}
                <Link to="/register" className="text-primary">
                    Create an account
                </Link>
            </p>
        </div>
    );
}
export default LoginPage;
