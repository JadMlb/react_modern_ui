import { Style } from "../../../styles";
import { GenericProps } from "../GenericProps";

type InputType = HTMLInputElement | HTMLTextAreaElement;

export interface BoxValueInputProps extends GenericProps
{
	/**
	 * The value of this input
	 */
	value?: any;
	/**
	 * The initial value of this input
	 */
	defaultValue?: any;
	/**
	 * The name of the field that contains the value of this input. If no label is provided, the provided `name` property will be used as a label with the first letter capitalized.
	 */
	name?: string;
	/**
	 * The label to be displayed on this input. If no label is provided, the provided `name` property will be used as a label with the first letter capitalized.
	 */
	label?: string;
	/**
	 * The style to apply on the label
	 */
	labelStyle?: Style;
	/**
	 * Change event handler fired when input value is changed
	 */
	onChange?: GenericOnChangeFunction;
	/**
	 * Event handler fired when input is focused
	 */
	onFocus?: React.FocusEventHandler<InputType>;
	/**
	 * Event handler fired when input loses focus
	 */
	onBlur?: React.FocusEventHandler<InputType>;
	/**
	 * Event handler fired when a key is pressed
	 */
	onKeyDown?: React.KeyboardEventHandler<InputType>;
	/**
	 * Event handler fired when a key is unpressed
	 */
	onKeyUp?: React.KeyboardEventHandler<InputType>;
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
	 * Automatically focuses on this input when the component is mounted
	 */
	autoFocus?: boolean;
	/**
	 * Associates input with a form by ID
	 */
	form?: string;
}

export type OnChangeFunction<T> = (e: React.ChangeEvent | null, value: T) => void;
export type GenericOnChangeFunction = OnChangeFunction<any>;