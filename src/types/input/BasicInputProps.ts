import { CommonInputProps } from "./CommonInputProps";

export interface BasicInputProps extends CommonInputProps
{
	/**
	 * The type of the input, either text, password, number, mail or datetime. For these types, the same naming is used as for the types of raw html input tag.
	 */
	type: "text" | "email" | "password" | "number" | "number-formatted" | "date" | "datetime" | "time";
	/**
	 * The component to be rendered after the input itself
	 */
	trailing?: React.ReactNode;
}