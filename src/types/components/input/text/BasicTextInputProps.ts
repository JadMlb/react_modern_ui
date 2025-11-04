import { BasicInputProps } from "../BasicInputProps";
import { OnChangeFunction } from "../BoxValueInputProps";

export default interface BasicTextInputProps extends BasicInputProps
{
	value?: string
	type: "text" | "email" | "password";
	onChange?: OnChangeFunction<string>;
}