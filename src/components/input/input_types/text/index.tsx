import * as React from "react";
import MultiLineTextInputProps from "../../../../types/components/input/text/MultiLineTextInputProps";
import NonTextTextualInputProps from "../../../../types/components/input/text/NonTextTextualInputProps";
import SingleLineTextInputProps from "../../../../types/components/input/text/SingleLineTextInputProps";
import MultiLineTextInput from "./multiline";
import SingleLineTextInput from "./single_line";

const TextInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, SingleLineTextInputProps | MultiLineTextInputProps | NonTextTextualInputProps> (
	(props, ref) =>
	{
		if (props.multiline)
			return <MultiLineTextInput ref = {ref as React.ForwardedRef<HTMLTextAreaElement>} {...props}/>;
		return <SingleLineTextInput ref = {ref as React.ForwardedRef<HTMLInputElement>} {...props}/>;
	}
);

export default TextInput;