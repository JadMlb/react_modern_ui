import { Measurements, PartialMeasurements } from "../Measurements";
import { ComponentsOverrides } from "./overridable";

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
	measurements: Measurements,
	defaults: ComponentsOverrides;
};

export type PartialThemeType = {
	mode?: "dark" | "light" | "auto",
	colours?: Partial<ThemeColours>,
	measurements?: PartialMeasurements,
	overrides?: ComponentsOverrides
};