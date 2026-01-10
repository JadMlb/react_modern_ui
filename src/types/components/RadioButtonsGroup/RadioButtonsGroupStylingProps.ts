import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";
import CommonInputStylingProps from "../input/CommonInput/CommonInputStylingProps";

export default interface GenericRadioButtonsGroupStylingProps<T> extends StylingProps<T>, CommonInputStylingProps<T>
{
	/**
	 * Sets the style of the group container
	 */
	style?: Style<T>;
	/**
	 * Sets the style of the clear button when enabled, i.e. when `optional` is `true`.
	 */
	clearButtonStyle?: Style<T>;
	/**
	 * Sets the style of the fieldset component wrapping the radio buttons
	 */
	fieldsetStyle?: Style<T>;
	/**
	 * Styles the checkboxes in the group
	 */
	checkboxStyle?: Style<T>;
	/**
	 * Styles the label of the checkboxes
	 */
	checkboxLabelStyle?: Style<T>;
	/**
	 * Styles the checkbox that is active in the group
	 */
	checkboxActiveStyle?: Style<T>;
}