import { ComponentsOverrides } from "../../types";
import DEFAULT_BADGE_PROPS from "./components/badge";
import { DEFAULT_FILLED_BUTTON_PROPS, DEFAULT_LINK_BUTTON_PROPS, DEFAULT_OUTLINED_BUTTON_PROPS } from "./components/button";
import DEFAULT_CARD_PROPS from "./components/card";
import DEFAULT_CHECKBOX_PROPS from "./components/checkbox";
import DEFAULT_COMBOBOX_PROPS from "./components/combobox";
import DEFAULT_INPUT_BASE_PROPS from "./components/input_base";
import { DEFAULT_NUMBER_INPUT_PROPS } from "./components/inputs";
import DEFAULT_LINK_PROPS from "./components/link";
import DEFAULT_LIST_PROPS from "./components/list";
import { DEFAULT_BLOCK_LOADER_PROPS, DEFAULT_TEXT_LOADER_PROPS } from "./components/loaders";
import DEFAULT_MENU_PROPS from "./components/menu";
import DEFAULT_PANEL_PROPS from "./components/panel";
import DEFAULT_PROGRESS_BAR_PROPS from "./components/progressBar";
import DEFAULT_RADIO_BUTTONS_GROUP_PROPS from "./components/radio";
import DEFAULT_SEPARATOR_PROPS from "./components/separator";
import DEFAULT_SWITCH_PROPS from "./components/switch";
import DEFAULT_TABLE_PROPS from "./components/table";
import DEFAULT_TAG_PROPS from "./components/tag";
import DEFAULT_TOASTER_PROPS from "./components/toaster";

export const DEFAULT_COMPONENTS_PROPS = {
	badge: DEFAULT_BADGE_PROPS,
	button: {
		filled: DEFAULT_FILLED_BUTTON_PROPS,
		outlined: DEFAULT_OUTLINED_BUTTON_PROPS,
		link: DEFAULT_LINK_BUTTON_PROPS
	},
	card: DEFAULT_CARD_PROPS,
	checkbox: DEFAULT_CHECKBOX_PROPS,
	combobox: DEFAULT_COMBOBOX_PROPS,
	input: {
		base: DEFAULT_INPUT_BASE_PROPS,
		number: DEFAULT_NUMBER_INPUT_PROPS
	},
	link: DEFAULT_LINK_PROPS,
	list: DEFAULT_LIST_PROPS,
	menu: DEFAULT_MENU_PROPS,
	panel: DEFAULT_PANEL_PROPS,
	// popups: {
	// 	backdrop: Overridable<OverridablePopupBackdropProps, StylingProps>,
	// 	dialog: Overridable<OverridableDialogProps, DialogProps>,
	// 	drawer: {
	// 		default: Overridable<OverridableDrawerProps, DialogProps>,
	// 		withHeader: Overridable<OverridableDrawerWithDefaultHeaderProps, DialogProps>,
	// 	}
	// },
	progressBar: DEFAULT_PROGRESS_BAR_PROPS,
	radioButtonsGroup: DEFAULT_RADIO_BUTTONS_GROUP_PROPS,
	separator: DEFAULT_SEPARATOR_PROPS,
	skeletonLoader: {
		block: DEFAULT_BLOCK_LOADER_PROPS,
		text: DEFAULT_TEXT_LOADER_PROPS
	},
	// slider: Overridable<OverridableSliderProps, SliderStylingProps>,
	switch: DEFAULT_SWITCH_PROPS,
	table: DEFAULT_TABLE_PROPS,
	tag: DEFAULT_TAG_PROPS,
	toaster: DEFAULT_TOASTER_PROPS
} satisfies ComponentsOverrides;