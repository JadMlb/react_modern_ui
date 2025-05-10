import { Option } from "../../Option";
import { CommonInputProps } from "../../input/CommonInputProps";
import { ActionElementStyle } from "../styles/actionElement/ActionElementStyle";

export interface ComboboxProps extends CommonInputProps
{
	style?: ActionElementStyle;
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
}