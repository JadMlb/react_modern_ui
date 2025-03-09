import { Shadow } from "../shadow/Shadow";

export interface BasicStyle
{
	width?: string;
	height?: string;
	padding?: string;
	forceTheme?: "dark" | "light";
	shadow?: Shadow | null;
}