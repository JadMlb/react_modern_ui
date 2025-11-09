import { TextInputProps } from "./TextInputProps";

export default interface SingleLineTextInputProps extends TextInputProps
{
	/**
	 * Switches to multiline mode, i.e. turns this input into a textarea. Defaults to `false`.
	 */
	multiline?: false;
}