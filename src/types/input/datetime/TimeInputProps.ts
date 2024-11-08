import GenericDateTimeInputProps from "./GenricDateTimeInputProps";
import TimeChoosable from "./TimeChoosable";

export default interface TimeInputProps extends GenericDateTimeInputProps, TimeChoosable
{
	type: "time";
}