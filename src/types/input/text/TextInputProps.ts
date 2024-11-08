import BasicTextInputProps from "./BasicTextInputProps";

export interface TextInputProps extends BasicTextInputProps
{
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