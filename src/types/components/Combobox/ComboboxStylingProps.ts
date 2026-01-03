import { Style } from "../../styles";
import InputBaseStylingProps from "../input/Base/InputBaseStylingProps";

export default interface ComboboxStylingProps extends InputBaseStylingProps
{
	/**
	 * Styles the menu, i.e. the popover component rendering the options
	 */
	menuStyle?: Style;
	/**
	 * Styles the tag components shown when value is an array
	 */
	tagsStyle?: Style;
}