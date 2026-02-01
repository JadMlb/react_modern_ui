import { BasicTextInputProps } from "./BasicTextInputProps";

export default interface NonTextTextualInputProps extends BasicTextInputProps
{
	type: Exclude<BasicTextInputProps["type"], "text">;
	multiline: false;
}