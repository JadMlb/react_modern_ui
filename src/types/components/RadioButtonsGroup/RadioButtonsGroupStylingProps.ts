import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export default interface RadioButtonsGroupStylingProps extends StylingProps
{
	/**
	 * Sets the style of the group container
	 */
	style?: Style;
	/**
	 * Sets the style of the clear button when enabled, i.e. when `optional` is `true`.
	 */
	clearButtonStyle?: Style;
	/**
	 * Sets the style of the fieldset component wrapping the radio buttons
	 */
	fieldsetStyle?: Style;
}