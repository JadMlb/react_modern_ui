import { TextInputProps } from "./TextInputProps";

export default interface MultiLineTextInputProps extends TextInputProps
{
	/**
	 * Switches to multiline mode, i.e. turns this input into a textarea. Defaults to `false`.
	 */
	multiline: true;
	ref?: React.Ref<HTMLTextAreaElement>;
}