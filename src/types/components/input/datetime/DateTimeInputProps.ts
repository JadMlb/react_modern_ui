import { GenericDateTimeInputProps } from "./GenericDateTimeInputProps";
import TimeChoosable from "./TimeChoosable";

export default interface DateTimeInputProps extends GenericDateTimeInputProps, TimeChoosable
{
	type: "datetime";
}