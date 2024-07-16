import theme from "./theme.json";

const coloursAltNames = {
	white: "neutral.light",
	black: "neutral.dark",
	elevated: "neutral.medium",
	gray: "gray.medium",
	grayDark: "gray.dark",
	grayLight: "gray.light",
	primary: "primary.medium",
	primaryElevated: "primary.light",
	primaryDark: "primary.dark",
	accent: "accent.medium",
	accentElevated: "accent.light",
	accentDark: "accent.dark",
	alert: "alert.medium",
	alertElevated: "alert.light",
	alertDark: "alert.dark",
	affirmative: "affirmative.medium",
	affirmativeElevated: "affirmative.light",
	affirmativeDark: "affirmative.dark",
	error: "error.medium",
	errorElevated: "error.light",
	errorDark: "error.dark"
};

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

type Colour = keyof typeof coloursAltNames;

export function colour (role: Colour)
{
	let roleTree = coloursAltNames[role].split (".");
	const COLOUR_TYPE = roleTree[0] as keyof typeof theme;
	return "#" + theme[COLOUR_TYPE][roleTree[1] as "dark" | "medium" | "light"];
}