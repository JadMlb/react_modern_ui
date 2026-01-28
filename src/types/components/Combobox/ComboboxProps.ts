import { Option } from "../../Option";
import { OnChangeFunction } from "../input/BoxValue";
import { CommonInputProps } from "../input/CommonInput";
import MenuConfigProps from "../Menu/MenuProps";
import { Props } from "../Props";
import GenericComboboxStylingProps from "./ComboboxStylingProps";

export type ComboboxArrow = {
	open: React.ReactNode;
	closed: React.ReactNode;
};

export interface ComboboxConfigProps extends Omit<CommonInputProps, "onKeyDown" | "onKeyUp">
{
	/**
	 * Sets the current value of the combobox. If an array is passed, the combobx is treated as having multiple values.
	 */
	value?: string | string[];
	/**
	 * The list of options to offer for selection
	 */
	options: Option[] | {[category: string]: Option[]};
	onChange?: OnChangeFunction<Option>;
	/**
	 * Forwards some props to the menu of the combobox
	 */
	menuProps?: Omit<MenuConfigProps, "anchorElement" | "open" | "children" | "onClose">;
	/**
	 * Customizes the icon displayed instead of the classical arrow
	 */
	arrowComponent?: Partial<ComboboxArrow>;
	/**
	 * Sets the colour of the default arrow used. If no value is provided, the colour follows the current mode ("light" or "dark")
	 */
	defaultArrowComponentColour?: string;
	/**
	 * Renders the options of the combobox
	 */
	renderOption?: RenderOptionFunction;
}

export type RenderOptionFunction = (option: Option, selected?: boolean, onClick?: OnChangeFunction<Option>) => React.ReactNode;

export type ComboboxStylingProps = GenericComboboxStylingProps<ComboboxConfigProps>;
export type ComboboxProps = Props<ComboboxConfigProps, ComboboxStylingProps>;

export type OverridableComboboxProps = Pick<ComboboxProps, "menuProps" | "arrowComponent" | "defaultArrowComponentColour" | "renderOption">;