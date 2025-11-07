import ReffableInput from "../ReffableInput";
import BasicTextInputProps from "./BasicTextInputProps";

export default interface PasswordInputProps extends BasicTextInputProps, ReffableInput
{
	type: "password";
}