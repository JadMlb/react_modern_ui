import { Style } from "../../styles";
import InputBaseStylingProps from "../input/Base/InputBaseStylingProps";

export default interface GenericComboboxStylingProps<T> extends InputBaseStylingProps<T>
{
	/**
	 * Styles the menu, i.e. the popover component rendering the options
	 */
	menuStyle?: Style<T>;
	/**
	 * Styles the tag components shown when value is an array
	 */
	tagsStyle?: Style<T>;
}