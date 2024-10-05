export interface BasicInputProps
{
	key?: string | number | bigint | null;
	/**
	 * The type of the input, either text, password, number, mail or datetime. For these types, the same naming is used as for the types of raw html input tag.
	 */
	type: "text" | "password" | "number" | "datetime-local" | "mail";
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
	 * Change event handler fired when typing
	 */
	onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	/**
	 * Change event handler fired when the clear button is clicked
	 */
	onClear: () => void;
	/**
	 * Hides the label of the input
	 */
	hideLabel?: boolean;
	/**
	 * Disables editing of this input even if no value is provided. Defaults to `false`.
	 */
	readonly?: boolean;
	/**
	 * Adds "optional" to the end of the label & enables clearing the value. Defaults to `false`.
	 */
	optional?: boolean;
}