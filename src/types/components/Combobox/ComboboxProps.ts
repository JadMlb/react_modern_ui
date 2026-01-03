import { Option } from "../../Option";
import { OnChangeFunction } from "../input/BoxValue";
import { CommonInputProps } from "../input/CommonInput";
import MenuProps from "../Menu/MenuProps";
import ComboboxStylingProps from "./ComboboxStylingProps";

export interface ComboboxProps extends Omit<CommonInputProps, "onKeyDown" | "onKeyUp">, ComboboxStylingProps
{
	/**
	 * Sets the current value of the combobox. If an array is passed, the combobx is treated as having multiple values.
	 */
	value: string | string[];
	/**
	 * The list of options to offer for selection
	 */
	options: Option[] | {[category: string]: Option[]};
	onChange?: OnChangeFunction<Option>;
	/**
	 * Forwards some props to the menu of the combobox
	 */
	menuProps?: Omit<MenuProps, "anchorElement" | "open" | "children" | "onClose" | "style">;
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
export type OverridableComboboxProps = Pick<ComboboxProps, "menuProps" | "arrowComponent" | "renderOption">;