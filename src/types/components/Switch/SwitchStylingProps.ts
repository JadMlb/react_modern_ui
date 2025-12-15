import { Style } from "../../styles";
import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";

export default interface SwitchStylingProps extends WrappedElementStylingProps
{
	/**
	 * Customises the styling of the slider background
	 */
	style?: Style;
	/**
	 * Customises the styling of the slider background when the switch is on, a.k.a when `value` is `true`
	 */
	activatedStyle?: Style;
	/**
	 * Customises the styling of the wrapper holding the switch and the label
	 */
	parentStyle?: Style;
	/**
	 * Customises the styling of the slider handle
	 */
	handleStyle?: Style;
	/**
	 * Customises the styling of the slider handle when the switch is on, a.k.a when `value` is `true`
	 */
	activatedHandleStyle?: Style;
}