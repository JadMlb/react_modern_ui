import { BasicInputProps } from "./BasicInputProps";

export default interface GenericDateTimeInputProps extends BasicInputProps
{
	value: string | Date,
	type: "date" | "datetime" | "time"
	onChange?: (value: string | Date) => void;
	validator?: (value: string | Date) => boolean;
}