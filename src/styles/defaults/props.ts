import { ComponentsOverrides } from "../../types";
import DEFAULT_BADGE_PROPS from "./components/badge";
import { DEFAULT_FILLED_BUTTON_PROPS, DEFAULT_LINK_BUTTON_PROPS, DEFAULT_OUTLINED_BUTTON_PROPS } from "./components/button";
import DEFAULT_CARD_PROPS from "./components/card";
import DEFAULT_CHECKBOX_PROPS from "./components/checkbox";

export const DEFAULT_COMPONENTS_PROPS = {
	badge: DEFAULT_BADGE_PROPS,
	button: {
		filled: DEFAULT_FILLED_BUTTON_PROPS,
		outlined: DEFAULT_OUTLINED_BUTTON_PROPS,
		link: DEFAULT_LINK_BUTTON_PROPS
	},
	card: DEFAULT_CARD_PROPS,
	checkbox: DEFAULT_CHECKBOX_PROPS,
} satisfies ComponentsOverrides;