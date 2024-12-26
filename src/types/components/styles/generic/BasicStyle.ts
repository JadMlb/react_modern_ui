import { Shadow } from "../shadow/Shadow";

export interface BasicStyle
{
	width?: string;
	height?: string;
	padding?: string;
	forceTheme?: "dark" | "light";
	fontWeight?: string;
	fontColor?: string | null;
	shadow?: Shadow | null;
}