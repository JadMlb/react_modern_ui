import { BasicInputProps } from "../BasicInputProps";

export default interface BasicTextInputProps extends BasicInputProps
{
	value?: string
	type: "text" | "email" | "password";
	onChange?: (e: React.ChangeEvent | null, value: string) => void;
}