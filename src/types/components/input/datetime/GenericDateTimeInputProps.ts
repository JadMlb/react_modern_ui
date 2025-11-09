import { BasicInputProps } from "../BasicInputProps";
import { OnChangeFunction } from "../BoxValueInputProps";

export default interface GenericDateTimeInputProps extends BasicInputProps
{
	value?: string | Date;
	type: "date" | "datetime" | "time";
	onChange?: OnChangeFunction<Date | string>;
	/**
	 * Defines the range, bounds included, of the value in the input field. If bound is null, it's equivalent to an infinity/unset. Defaults to `[-infinity, infinity]`.
	 */
	range?: [Date | null, Date | null];
}