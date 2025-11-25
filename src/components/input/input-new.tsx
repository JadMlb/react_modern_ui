import * as React from "react";
import { NumberInputProps } from "../../types/components/input/number/NumberInputProps";
import NumberInput from "./input_types/number";
import TextInput from "./input_types/text";
import NonTextTextualInputProps from "../../types/components/input/text/NonTextTextualInputProps";
import DateInput from "./input_types/date";
import DateInputProps from "../../types/components/input/datetime/DateInputProps";
import DateTimeInputProps from "../../types/components/input/datetime/DateTimeInputProps";
import TimeInputProps from "../../types/components/input/datetime/TimeInputProps";
import SingleLineTextInputProps from "../../types/components/input/text/SingleLineTextInputProps";
import MultiLineTextInputProps from "../../types/components/input/text/MultiLineTextInputProps";

type InputProps = NumberInputProps |
					SingleLineTextInputProps |
					MultiLineTextInputProps |
					NonTextTextualInputProps |
					DateInputProps |
					DateTimeInputProps |
					TimeInputProps;

const NewInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps> (
	(props, ref) =>
	{
		function getInputFromType ()
		{
			switch (props.type)
			{
				case "number":
					return <NumberInput {...props} ref = {ref as React.ForwardedRef<HTMLInputElement>}/>;
				case "text":
				case "email":
				case "password":
				case "search":
				case "tel":
				case "url":
					return <TextInput {...props} ref = {ref}/>;
				case "date":
				case "datetime":
				case "time":
					return <DateInput {...props} ref = {ref as React.ForwardedRef<HTMLInputElement>}/>;
				default: return null;
			}
		}
		
		return getInputFromType();	
	}
);

export default NewInput;