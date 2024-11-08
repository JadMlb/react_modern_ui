import { BasicInputProps } from "../BasicInputProps";

export default interface GenericDateTimeInputProps extends BasicInputProps
{
	value?: string | Date,
	type: "date" | "datetime" | "time"
	onChange?: (value: string | Date) => void;
	validator?: (value: string | Date) => boolean;
	/**
	 * Defines the range, bounds included, of the value in the input field. If bound is null, it's equivalent to an infinity/unset. Defaults to `[-infinity, infinity]`.
	 */
	range?: [Date | null, Date | null];
}