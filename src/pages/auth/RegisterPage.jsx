import { Alert, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import FormField from "@/components/FormField";
import TextInput from "@/components/FormInputs/TextInput";
import { useRegisterMutation } from "@/services/rootApi";
import { openSnackbar } from "@/redux/slices/snackBarSlice";

function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { data = {}, isSuccess, isError, error }] =
        useRegisterMutation();

    // Validate data with yup
    const formSchema = yup.object().shape({
        fullName: yup.string().required("Fullname is required"),
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
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema), // ← Kết nối Yup với React Hook Form
        // Khi kiểm soát việc thay đổi dữ liệu của input với value & onChange thì phải có default value
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (formData) => {
        register(formData); // Data đã được validate
    };

    // navigate (di chuyển qua 1 route khác) là 1 dạng side effect, chỗ nào sử dụng navigate thì phải bọc trong useEffect hoặc để nó trong 1 event handler (vd: onSubmit)
    useEffect(() => {
        if (isSuccess) {
            // Gửi đi message lấy từ Api
            dispatch(openSnackbar({ message: data.message }));
            navigate("/login");
        }
    }, [data.message, isSuccess, dispatch, navigate]);

    return (
        <div>
            <div className="text-dark-200">
                <p className="mb-2 text-2xl font-medium">
                    Adventure starts here 🚀
                </p>
                <p className="mb-5 text-[0.9rem]">
                    Make your app management easy and fun!
                </p>
            </div>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    name="fullName"
                    label="Full Name"
                    control={control}
                    Component={TextInput}
                    error={errors["fullName"]}
                />

                <FormField
                    name="email"
                    label="Email"
                    control={control}
                    Component={TextInput}
                    error={errors["email"]}
                />

                <FormField
                    name="password"
                    label="Password"
                    type="password"
                    control={control}
                    Component={TextInput}
                    error={errors["password"]}
                />

                <Button variant="contained" type="submit">
                    Sign up
                </Button>
                {isError && (
                    <Alert severity="error">{error?.data?.message}</Alert>
                )}
            </form>
            <p className="mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                    Sign in instead
                </Link>
            </p>
        </div>
    );
}
export default RegisterPage;
