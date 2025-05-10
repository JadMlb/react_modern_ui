import { BasicInputProps } from "../BasicInputProps";

export interface NumberInputProps extends BasicInputProps
{
	value?: number;
	type: "number";
	/**
	 * Defines the range, bounds included, of the value in the input field. If bound is null, it's equivalent to an infinity. Defaults to `[-infinity, infinity]`.
	 */
	range?: [number | null, number | null];
	/**
	 * Defines the step size that the buttons will increment or decrement. Defaults to `1`.
	 */
	step?: number;
	/**
	 * Defines the precision of the value inside of the number field. If precision <= 0, the value is an integer, otherwise a real number with `precision` amount of digits in the decimal places. Defaults to `0`.
	 */
	precision?: number;
	onChange?: (e: React.ChangeEvent | null, value: number) => void;
}