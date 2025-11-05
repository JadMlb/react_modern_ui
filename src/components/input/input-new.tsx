import { NumberInputProps } from "../../types/components/input/number/NumberInputProps";
import { TextInputProps } from "../../types/components/input/text/TextInputProps";
import NumberInput from "./input_types/number";
import TextInput from "./input_types/text";
import EmailInputProps from "../../types/components/input/text/EmailInputProps";
import PasswordInputProps from "../../types/components/input/text/PasswordInputProps";
import DateInput from "./input_types/date";
import DateInputProps from "../../types/components/input/datetime/DateInputProps";
import DateTimeInputProps from "../../types/components/input/datetime/DateTimeInputProps";
import TimeInputProps from "../../types/components/input/datetime/TimeInputProps";
import { ForwardedRef, forwardRef } from "react";

type InputProps = NumberInputProps |
					TextInputProps |
					EmailInputProps |
					PasswordInputProps |
					DateInputProps |
					DateTimeInputProps |
					TimeInputProps;

const NewInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps> (
	(props, ref) =>
	{
		function getInputFromType ()
		{
			switch (props.type)
			{
				case "number":
					return <NumberInput
								ref = {ref as ForwardedRef<HTMLInputElement>}
								{...props}
							/>;
				case "text":
				case "email":
				case "password":
					return <TextInput ref = {ref} {...props}/>;
				case "date":
				case "datetime":
				case "time":
					return <DateInput
								ref = {ref as ForwardedRef<HTMLInputElement>}
								{...props}
							/>;
				default: return <input ref = {ref as ForwardedRef<HTMLInputElement>}/>;
			}
		}
		
		return getInputFromType();	
	}
);

export default NewInput;