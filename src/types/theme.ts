import { Measurements, PartialMeasurements } from "./Measurements";

export type ColourFamily = {
	dark: string,
	medium: string,
	light: string
};

export type ThemeColours = {
	primary: ColourFamily,
	accent: ColourFamily,
	neutral: ColourFamily,
	gray: ColourFamily,
	affirmative: ColourFamily,
	error: ColourFamily,
	alert: ColourFamily
};

export type ThemeType = {
	mode: "dark" | "light" | "auto",
	colours: ThemeColours,
	measurements: Measurements
};

export type PartialThemeType = {
	mode?: "dark" | "light" | "auto",
	colours?: Partial<ThemeColours>,
	measurements?: PartialMeasurements
};