import { BasicStyle } from "../generic/BasicStyle";

export interface TextStyle extends BasicStyle
{
	fontFamily?: string;
	fontWeight?: string;
	fontSize?: string;
	color?: string | null;
	underlineColor?: string | null;
}