import { COLOURS_ALT_NAMES, Colour } from "../types/Colours";
import ThemeType from "../types/theme";

export const radius = {
	small: "7px",
	normal: "12px",
	medium: "15px",
	large: "20px",
	round: "50%"
};

export const spacing = {
	xxsmall: "2px",
	xsmall: "5px",
	small: "7px",
	normal: "10px",
	medium: "12px",
	large: "15px",
	xlarge: "25px",
	xxlarge: "35px"
};

export function colour (role: Colour, theme: ThemeType)
{
	let roleTree = COLOURS_ALT_NAMES[role].split (".");
	const COLOUR_TYPE = roleTree[0] as keyof Omit<ThemeType, "mode">;
	return "#" + theme[COLOUR_TYPE][roleTree[1] as "dark" | "medium" | "light"];
}