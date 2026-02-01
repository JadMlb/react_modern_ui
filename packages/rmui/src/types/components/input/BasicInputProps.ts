import { CommonInputProps } from "./CommonInput";

export interface BasicInputProps extends CommonInputProps
{
	/**
	 * The type of the input, either text, password, number, mail or datetime. For these types, the same naming is used as for the types of raw html input tag.
	 */
	type: "text" | "email" | "password" | "number" | "date" | "datetime" | "time" | "month" | "week" | "search" | "url" | "tel";
	/**
	 * The component to be rendered after the input itself
	 */
	trailing?: React.ReactNode;
	/**
	 * The placeholder text displayed when the input is empty
	 */
	placeholder?: string;
	/**
	 * Helps autocomplete on this input
	 */
	autoComplete?: string;
}

export type OverridableBasicInputProps = Pick<BasicInputProps, "autoComplete" | "autoFocus" | "hideLabel" | "leading" | "trailing">;