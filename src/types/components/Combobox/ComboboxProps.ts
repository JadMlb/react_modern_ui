import { Option } from "../../Option";
import { OnChangeFunction } from "../input";
import { CommonInputProps } from "../input/CommonInputProps";

export interface ComboboxProps extends CommonInputProps
{
	/**
	 * The list of options to offer for selection
	 */
	options: Option[] | {[category: string]: Option[]};
	/**
	 * Hides the search bar in the options list. Defaults to `false`.
	 */
	hideSearch?: boolean;
	/**
	 * Fixes the position of the options popup no matter the position of the combobox.
	 * Default behaviour will check if there is enough space to display the options list below the combobox; and if not; the list will be rendered onabove.
	 */
	position?: "top" | "bottom";
	/**
	 * Customizes the icon displayed instead of the classical arrow
	 */
	arrowComponent?: {open: React.ReactNode, closed: React.ReactNode};
	/**
	 * Renders the options of the combobox
	 */
	renderOption?: RenderOptionFunction;
}

export type RenderOptionFunction = (option: Option, selected?: boolean, onClick?: OnChangeFunction<Option>) => React.ReactNode;