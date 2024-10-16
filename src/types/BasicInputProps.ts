export interface BasicInputProps
{
	key?: string | number | bigint | null;
	/**
	 * The type of the input, either text, password, number, mail or datetime. For these types, the same naming is used as for the types of raw html input tag.
	 */
	type: "text" | "password" | "number" | "datetime" | "email";
	/**
	 * The current value of this input
	 */
	value: any;
	/**
	 * The name of the field that contains the value of this input. If no label is provided, the provided `name` property will be used as a label with the first letter capitalized.
	 */
	name: string;
	/**
	 * The label to be displayed on this input. If no label is provided, the provided `name` property will be used as a label with the first letter capitalized.
	 */
	label?: string;
	/**
	 * Displays a string to assist the user in filling the field
	 */
	hint?: string;
	/**
	 * Defines what string to display when an error occurs with the validator
	 */
	textOnError?: string;
	/**
	 * Validator function used to check the value of the input and return `true` if valid, `false` otherwise.
	 * @param value The current value of the input field
	 * @returns `true` if the value should be considered valid, `false` otherwise
	 */
	validator?: (value: any) => boolean;
	/**
	 * Change event handler fired when input value is changed
	 */
	onChange?: (value: any) => void;
	/**
	 * Change event handler fired when the clear button is clicked
	 */
	onClear?: () => void;
	/**
	 * Hides the label of the input
	 */
	noLabel?: boolean;
	/**
	 * Disables editing of this input even if no value is provided. Defaults to `false`.
	 */
	readonly?: boolean;
	/**
	 * Disables this input completely. Defaults to `false`.
	 */
	disabled?: boolean;
	/**
	 * Adds "optional" to the end of the label & enables clearing the value when possible. Defaults to `false`.
	 */
	optional?: boolean;
}