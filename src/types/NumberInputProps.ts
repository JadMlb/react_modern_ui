import { BasicInputProps } from "./BasicInputProps";

export interface NumberInputProps extends BasicInputProps
{
	value: number;
	type: "number";
	onChange?: (value: number) => void;
	/**
	 * Change event handler fired when the clear button is clicked. Clear button resets the value to `0`.
	 */
	onClear?: () => void;
}