import { TextBoxStyle } from "../textbox/TextBoxStyle";

export interface ActionElementStyle extends TextBoxStyle
{
	hover?: TextBoxStyle;
	disabled?: TextBoxStyle;
	focus?: TextBoxStyle;
}