import { ComponentsOverrides } from "../../types";
import DEFAULT_BADGE_PROPS from "./components/badge";
import { DEFAULT_FILLED_BUTTON_PROPS, DEFAULT_LINK_BUTTON_PROPS, DEFAULT_OUTLINED_BUTTON_PROPS } from "./components/button";
import DEFAULT_CARD_PROPS from "./components/card";
import DEFAULT_CHECKBOX_PROPS from "./components/checkbox";
import DEFAULT_LINK_PROPS from "./components/link";
import DEFAULT_LIST_PROPS from "./components/list";
import DEFAULT_MENU_PROPS from "./components/menu";
import DEFAULT_PANEL_PROPS from "./components/panel";
import DEFAULT_PROGRESS_BAR_PROPS from "./components/progressBar";
import DEFAULT_SEPARATOR_PROPS from "./components/separator";

export const DEFAULT_COMPONENTS_PROPS = {
	badge: DEFAULT_BADGE_PROPS,
	button: {
		filled: DEFAULT_FILLED_BUTTON_PROPS,
		outlined: DEFAULT_OUTLINED_BUTTON_PROPS,
		link: DEFAULT_LINK_BUTTON_PROPS
	},
	card: DEFAULT_CARD_PROPS,
	checkbox: DEFAULT_CHECKBOX_PROPS,
	link: DEFAULT_LINK_PROPS,
	list: DEFAULT_LIST_PROPS,
	menu: DEFAULT_MENU_PROPS,
	panel: DEFAULT_PANEL_PROPS,
	progressBar: DEFAULT_PROGRESS_BAR_PROPS,
	separator: DEFAULT_SEPARATOR_PROPS,
} satisfies ComponentsOverrides;