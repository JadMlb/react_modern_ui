import { GenericProps } from "../GenericProps";

export interface ValueInputProps extends GenericProps
{
	/**
	 * The initial value of this input
	 */
	value?: any;
	/**
	 * The name of the field that contains the value of this input. If no label is provided, the provided `name` property will be used as a label with the first letter capitalized.
	 */
	name?: string;
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
	 * Signals whether this text input contains an error or not
	 */
	isError?: boolean;
	/**
	 * Change event handler fired when input value is changed
	 */
	onChange?: GenericOnChangeFunction;
	/**
	 * Hides the label of the input
	 */
	hideLabel?: boolean;
	/**
	 * Disables editing of this input even if no value is provided. Defaults to `false`.
	 */
	readonly?: boolean;
	/**
	 * Disables this input completely. Defaults to `false`.
	 */
	disabled?: boolean;
	/**
	 * Enables clearing the value when possible. Defaults to `false`.
	 */
	optional?: boolean;
}

export type OnChangeFunction<T> = (e: React.ChangeEvent | null, value: T) => void;
export type GenericOnChangeFunction = OnChangeFunction<any>;