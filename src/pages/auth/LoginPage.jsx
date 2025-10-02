import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import FormField from "@/components/FormField";
import TextInput from "@/components/FormInputs/TextInput";

function LoginPage() {
    const { control } = useForm();

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
            <form className="flex flex-col gap-4">
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

                <Button variant="contained">Sign in</Button>
            </form>
            <p className="mt-4">
                New on our platform?{" "}
                <Link to="/login" className="text-primary">
                    Create an account
                </Link>
            </p>
        </div>
    );
}
export default LoginPage;
