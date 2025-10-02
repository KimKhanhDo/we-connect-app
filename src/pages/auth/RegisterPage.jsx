import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import FormField from "@/components/FormField";
import TextInput from "@/components/FormInputs/TextInput";

function RegisterPage() {
    const { control } = useForm();

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
            <form className="flex flex-col gap-4">
                <FormField
                    name="fullName"
                    label="Full Name"
                    control={control}
                    Component={TextInput}
                />

                <FormField
                    name="email"
                    label="Email"
                    control={control}
                    Component={TextInput}
                />

                <FormField
                    name="password"
                    label="Password"
                    type="password"
                    control={control}
                    Component={TextInput}
                />

                <Button variant="contained">Sign up</Button>
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
