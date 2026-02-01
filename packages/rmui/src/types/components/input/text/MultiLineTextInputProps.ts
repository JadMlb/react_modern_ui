import { BasicTextInputProps } from "./BasicTextInputProps";

export default interface MultiLineTextInputProps extends BasicTextInputProps
{
	/**
	 * Switches to multiline mode, i.e. turns this input into a textarea. Defaults to `false`.
	 */
	multiline: true;
	/**
	 * Determines how the text is wrapped in a multiline text input
	 * - "off": means no wrapping
	 * - "soft": wraps text visually
	 * - "hard": adds line breaks to the value when line wraps
	 * @default "soft"
	 */
	wrap?: "off" | "soft" | "hard";
	/**
	 * Sets the default number of rows when `multiline` is set. Defaults to `2`
	 */
	rows?: number;
	/**
	 * Enables device's autocorrect feature on this input
	 */
	autoCorrect?: string;
}