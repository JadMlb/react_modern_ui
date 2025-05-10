import { GenericProps } from "../components/GenericProps";

export interface CommonInputProps extends GenericProps
{
	/**
	 * The initial value of this input
	 */
	value?: any;
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
	 * Change event handler fired when input value is changed
	 */
	onChange?: (e: React.ChangeEvent | null, value: any) => void;
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
	/**
	 * The component to be rendered before the input itself
	 */
	leading?: React.ReactNode;
}