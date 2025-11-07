import ReffableInput from "../ReffableInput";
import { TextInputProps } from "./TextInputProps";

export default interface SingleLineTextInputProps extends TextInputProps, ReffableInput
{
	/**
	 * Switches to multiline mode, i.e. turns this input into a textarea. Defaults to `false`.
	 */
	multiline?: false;
}