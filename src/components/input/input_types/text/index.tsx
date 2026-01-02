import MultiLineTextInputProps from "../../../../types/components/input/text/MultiLineTextInputProps";
import NonTextTextualInputProps from "../../../../types/components/input/text/NonTextTextualInputProps";
import SingleLineTextInputProps from "../../../../types/components/input/text/SingleLineTextInputProps";
import MultiLineTextInput from "./multiline";
import SingleLineTextInput from "./single_line";

export default function TextInput (props: SingleLineTextInputProps | MultiLineTextInputProps | NonTextTextualInputProps)
{
	if (props.multiline)
		return <MultiLineTextInput {...props}/>;
	return <SingleLineTextInput {...props}/>;
}