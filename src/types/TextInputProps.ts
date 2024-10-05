import { BasicInputProps } from "./BasicInputProps";

export interface TextInputProps extends BasicInputProps
{
	value: string
	type: "text"
	/**
	 * Specifies whether this input should occupy 100% of its parent's width or not. Defaults to `false`.
	 */
	wide?: boolean;
	/**
	 * Switches to multiline mode, i.e. turns this input into a textarea. Defaults to `false`.
	 */
	multiline?: boolean;
	/**
	 * Shows the current and the max number of characters allowed. Only works if `maxCharCount` property is set. Defaults to `false`.
	 */
	displayCharCount?: boolean;
	/**
	 * Sets the max number of characters in this input
	 */
	maxCharCount?: number;
}