import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import FormField from "@/components/FormField";
import OPTInput from "@/components/FormInputs/OPTInput";

function OTPVerifyPage() {
    const { control } = useForm();

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
            <form className="flex flex-col gap-4">
                <FormField
                    name="email"
                    label="Type your 6 digit security code"
                    control={control}
                    Component={OPTInput}
                />

                <Button variant="contained">Verify my account</Button>
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
