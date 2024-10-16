import { BasicInputProps } from "./BasicInputProps";

export default interface DateInputProps extends BasicInputProps
{
	value: string,
	type: "datetime"
	onChange?: (value: string) => void;
	validator?: (value: string) => boolean;
	withTime?: boolean
}