import { BasicInputProps } from "../BasicInputProps";
import { OnChangeFunction } from "../BoxValueInputProps";

export default interface BasicTextInputProps extends BasicInputProps
{
	value?: string
	type: "text" | "email" | "password" | "search" | "url" | "tel";
	/**
	 * Shows the current and the max number of characters allowed. Only works if `maxCharCount` property is set. Defaults to `false`.
	 */
	displayLength?: boolean;
	/**
	 * Sets the min number of characters in this input
	 */
	minLength?: number;
	/**
	 * Sets the max number of characters in this input
	 */
	maxLength?: number;
	/**
	 * Defines the pattern of the input, treated as a regex string. This will control the input value and would not allow any values that do not match the pattern 
	 */
	pattern?: string;
	/**
	 * hints the type of virtual keyboard on mobile devices
	 */
	inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
	onChange?: OnChangeFunction<string>;
}