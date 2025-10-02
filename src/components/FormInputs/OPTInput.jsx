import { MuiOtpInput } from "mui-one-time-password-input";

function OPTInput({ value, onChange }) {
    return <MuiOtpInput length={6} value={value} onChange={onChange} />;
}
export default OPTInput;
