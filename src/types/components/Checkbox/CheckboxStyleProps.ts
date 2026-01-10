import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";
import BoxValueInputStylingProps from "../input/BoxValue/BoxValueInputStylingProps";

export interface GenericCheckboxStylingProps<T> extends StylingProps<T>, BoxValueInputStylingProps<T>
{
	/**
	 * Customises the styling of the checkbox
	 */
	style?: Style<T>;
	/**
	 * Customises the styling of the checkbox when `state` is set to `true` or `2`. Only appl
	 */
	checkedStyle?: Style<T>;
	/**
	 * Customises the styling of the checkbox when `state` is set to `1`
	 */
	intermediateStyle?: Style<T>;
}