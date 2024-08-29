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
	xxsmall: "0.3rem",
	xsmall: "0.65rem",
	small: "0.8rem",
	normal: "1rem",
	medium: "3rem",
	large: "5rem",
	xlarge: "7rem",
	xxlarge: "10rem",
};

export function colour (role: Colour, theme: ThemeType)
{
	let roleTree = COLOURS_ALT_NAMES[role].split (".");
	const COLOUR_TYPE = roleTree[0] as keyof Omit<ThemeType, "mode">;
	return "#" + theme[COLOUR_TYPE][roleTree[1] as "dark" | "medium" | "light"];
}