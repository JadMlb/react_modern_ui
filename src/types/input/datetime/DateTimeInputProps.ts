import GenericDateTimeInputProps from "./GenricDateTimeInputProps";
import TimeChoosable from "./TimeChoosable";

export default interface DateTimeInputProps extends GenericDateTimeInputProps, TimeChoosable
{
	type: "datetime";
}