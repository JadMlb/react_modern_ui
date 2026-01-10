import { BasicTextInputProps } from "./BasicTextInputProps";

export default interface SingleLineTextInputProps extends BasicTextInputProps
{
	/**
	 * Switches to multiline mode, i.e. turns this input into a textarea. Defaults to `false`.
	 */
	multiline?: false;
	/**
	 * Enables device's autocorrect feature on this input
	 */
	autoCorrect?: string;
}