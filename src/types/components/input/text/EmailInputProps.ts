import ReffableInput from "../ReffableInput";
import BasicTextInputProps from "./BasicTextInputProps";

export default interface EmailInputProps extends BasicTextInputProps, ReffableInput
{
	type: "email";
}