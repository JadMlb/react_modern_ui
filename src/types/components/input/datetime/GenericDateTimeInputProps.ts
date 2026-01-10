import { Props } from "../../Props";
import GenericInputBaseStylingProps from "../Base/InputBaseStylingProps";
import { BasicInputProps, OverridableBasicInputProps } from "../BasicInputProps";
import { OnChangeFunction } from "../BoxValue";

export default interface GenericDateTimeInputConfigProps extends BasicInputProps
{
	value?: string | Date;
	type: "date" | "datetime" | "time";
	onChange?: OnChangeFunction<Date | string>;
	/**
	 * Defines the range, bounds included, of the value in the input field. If bound is null, it's equivalent to an infinity/unset. Defaults to `[-infinity, infinity]`.
	 */
	range?: [Date | null, Date | null];
}

export type GenericDateTimeInputStylingProps = GenericInputBaseStylingProps<GenericDateTimeInputConfigProps>;
export type GenericDateTimeInputProps = Props<GenericDateTimeInputConfigProps, GenericDateTimeInputStylingProps>;

export type OverridableDateTimeInputProps = OverridableBasicInputProps;