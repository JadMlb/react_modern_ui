import { ThemeType } from "../../types/styles/theme";
import { DEFAULT_COLOURS } from "./colours";
import { DEFAULT_RADIUS, DEFAULT_SPACING } from "./measurements";
import { DEFAULT_COMPONENTS_PROPS } from "./props";

export const DEFAULT_THEME: ThemeType = {
	mode: "auto",
	measurements: {
		radius: DEFAULT_RADIUS,
		spacing: DEFAULT_SPACING
	},
	colours: DEFAULT_COLOURS,
	defaults: DEFAULT_COMPONENTS_PROPS
};