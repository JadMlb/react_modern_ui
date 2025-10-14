import { BoxValueInputProps } from "./BoxValueInputProps";

export interface ValueInputProps extends BoxValueInputProps
{
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
	 * Enables clearing the value when possible. Defaults to `false`.
	 */
	optional?: boolean;
}