import { BoxStyle } from "../box/BoxStyle";

export interface ActionElementStyle extends BoxStyle
{
	hover?: BoxStyle;
	disabled?: BoxStyle;
}