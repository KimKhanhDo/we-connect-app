import { TextField } from "@mui/material";

function TextInput({ name, value, type = "text", onChange }) {
    return (
        <TextField
            fullWidth
            slotProps={{
                input: {
                    className: "h-10 px-3 py-2",
                },
                htmlInput: {
                    className: "!p-0",
                },
            }}
            name={name}
            value={value}
            type={type}
            onChange={onChange}
        />
    );
}
export default TextInput;
