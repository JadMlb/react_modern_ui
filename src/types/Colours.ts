export type Colour = keyof typeof COLOURS_ALT_NAMES;

export const COLOURS_ALT_NAMES = {
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