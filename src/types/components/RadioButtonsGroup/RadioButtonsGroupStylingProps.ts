import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";
import CommonInputStylingProps from "../input/CommonInput/CommonInputStylingProps";

export default interface RadioButtonsGroupStylingProps extends StylingProps, CommonInputStylingProps
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
	/**
	 * Styles the checkboxes in the group
	 */
	checkboxStyle?: Style;
	/**
	 * Styles the label of the checkboxes
	 */
	checkboxLabelStyle?: Style;
	/**
	 * Styles the checkbox that is active in the group
	 */
	checkboxActiveStyle?: Style;
}