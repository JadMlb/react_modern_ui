import { Option } from "../../Option";
import { OnChangeFunction } from "../input/BoxValueInputProps";
import { CommonInputProps } from "../input/CommonInputProps";
import MenuProps from "../Menu/MenuProps";

export interface ComboboxProps extends CommonInputProps
{
	/**
	 * The list of options to offer for selection
	 */
	options: Option[] | {[category: string]: Option[]};
	onChange?: OnChangeFunction<Option>;
	/**
	 * Hides the search bar in the options list. Defaults to `false`.
	 */
	hideSearch?: boolean;
	/**
	 * Forwards some props to the menu of the combobox
	 */
	menuProps?: Omit<MenuProps, "anchorElement" | "open" | "children" | "onClose">;
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