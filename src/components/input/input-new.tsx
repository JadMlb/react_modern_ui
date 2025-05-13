import { NumberInputProps } from "../../types/input/number/NumberInputProps";
import { TextInputProps } from "../../types/input/text/TextInputProps";
import NumberInput from "./input_types/number";
import TextInput from "./input_types/text";
import EmailInputProps from "../../types/input/text/EmailInputProps";
import PasswordInputProps from "../../types/input/text/PasswordInputProps";
import DateInput from "./input_types/date";
import DateInputProps from "../../types/input/datetime/DateInputProps";
import DateTimeInputProps from "../../types/input/datetime/DateTimeInputProps";
import TimeInputProps from "../../types/input/datetime/TimeInputProps";

type InputProps = NumberInputProps |
					TextInputProps |
					EmailInputProps |
					PasswordInputProps |
					DateInputProps |
					DateTimeInputProps |
					TimeInputProps;

export default function NewInput (props: InputProps)
{
	function getInputFromType ()
	{
		switch (props.type)
		{
			case "number": return <NumberInput {...props}/>;
			case "text":
			case "email":
			case "password":
				return <TextInput {...props}/>;
			case "date":
			case "datetime":
			case "time":
				return <DateInput {...props}/>
			default: return <input/>;
		}
	}
	
	return getInputFromType();	
}