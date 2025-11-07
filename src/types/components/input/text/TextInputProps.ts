import BasicTextInputProps from "./BasicTextInputProps";

export interface TextInputProps extends BasicTextInputProps
{
	/**
	 * Sets the default number of rows when `multiline` is set. Defaults to `2`
	 */
	rows?: number;
	/**
	 * Shows the current and the max number of characters allowed. Only works if `maxCharCount` property is set. Defaults to `false`.
	 */
	displayCharCount?: boolean;
	/**
	 * Sets the max number of characters in this input
	 */
	maxCharCount?: number;
}