import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export interface CheckboxStylingProps extends StylingProps
{
	/**
	 * Customises the styling of the checkbox
	 */
	style?: Style;
	/**
	 * Customises the styling of the label
	 */
	labelStyle?: Style;
	/**
	 * Customises the styling of the checkbox when `state` is set to `true` or `2`. Only appl
	 */
	checkedStyle?: Style;
	/**
	 * Customises the styling of the checkbox when `state` is set to `1`
	 */
	intermediateStyle?: Style;
}