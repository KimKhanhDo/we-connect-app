import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import FormField from "@/components/FormField";
import OTPInput from "@/components/FormInputs/OTPInput";
import { useVerifyOTPMutation } from "@/services/rootApi";
import { openSnackbar } from "@/redux/slices/snackbarSlice";
import { login } from "@/redux/slices/authSlice";

function OTPVerifyPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Khi kiểm soát việc thay đổi dữ liệu của input với value & onChange thì phải có default value
    const { control, handleSubmit } = useForm({
        defaultValues: {
            otp: "",
        },
    });

    const [verifyOTP, { data, isError, error, isSuccess }] =
        useVerifyOTPMutation();

    const onSubmit = (formData) => {
        verifyOTP({ email: location?.state?.email, otp: formData.otp });
    };

    useEffect(() => {
        if (isError) {
            dispatch(
                openSnackbar({ type: "error", message: error?.data?.message }),
            );
        }

        // data trả về là accessToken & refreshToken -> dùng làm tham số cho login
        if (isSuccess) {
            dispatch(login(data));
            navigate("/");
        }
    }, [error, isError, dispatch, isSuccess, navigate, data]);
    return (
        <div>
            <div className="text-dark-200">
                <p className="mb-2 text-2xl font-medium">
                    Two-Step Verification 💬
                </p>
                <p className="mb-5 text-[0.9rem]">
                    We sent a verification code to your mobile. Enter the code
                    from the mobile in the field below.
                </p>
            </div>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    name="otp"
                    label="Type your 6 digit security code"
                    control={control}
                    Component={OTPInput}
                />

                <Button variant="contained" type="submit">
                    Verify my account
                </Button>
            </form>
            <p className="mt-4">
                Didn't get the code?{" "}
                <Link to="/login" className="text-primary">
                    Resend
                </Link>
            </p>
        </div>
    );
}
export default OTPVerifyPage;
