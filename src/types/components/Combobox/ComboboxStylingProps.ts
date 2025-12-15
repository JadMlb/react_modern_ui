import StylingProps from "../../styles/StylingProps";
import { RenderOptionFunction } from "./ComboboxProps";

export default interface ComboboxStylingProps extends StylingProps
{
	/**
	 * Customizes the icon displayed instead of the classical arrow
	 */
	arrowComponent?: {open: React.ReactNode, closed: React.ReactNode};
	/**
	 * Renders the options of the combobox
	 */
	renderOption?: RenderOptionFunction;
}