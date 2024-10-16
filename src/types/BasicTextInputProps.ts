import { BasicInputProps } from "./BasicInputProps";

export default interface BasicTextInputProps extends BasicInputProps
{
	value: string
	type: "text" | "email" | "password";
	/**
	 * Specifies whether this input should occupy 100% of its parent's width or not. Defaults to `false`.
	 */
	wide?: boolean;
	onChange?: (value: string) => void;
	validator?: (value: string) => boolean;
}