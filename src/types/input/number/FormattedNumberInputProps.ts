import { BasicInputProps } from "../BasicInputProps";

export default interface FormattedNumberInputProps extends BasicInputProps
{
	value?: number;
	type: "number-formatted";
	onChange?: (value: number) => void;
	validator?: (value: number) => boolean;
	/**
	 * The pattern to apply on that number input
	 */
	pattern: string
}