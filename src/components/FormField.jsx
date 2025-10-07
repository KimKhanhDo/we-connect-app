/* eslint-disable no-unused-vars */
import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

function FormField({ control, label, name, type, error, Component }) {
    return (
        <div>
            <p className="text-dark-200 mb-1 text-sm font-bold">{label}</p>

            {/* Dùng Controller để tạo ra 1 field trong React Hook Form */}
            <Controller
                name={name}
                control={control}
                render={({ field: { name, value, onChange } }) => {
                    return (
                        <Component
                            name={name}
                            value={value}
                            type={type}
                            control={control}
                            error={error?.message}
                            onChange={onChange}
                        />
                    );
                }}
            />

            {error?.message && (
                <FormHelperText error={true}>{error.message}</FormHelperText>
            )}
        </div>
    );
}
export default FormField;
