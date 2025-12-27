import { Style } from "../../styles";
import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";
import BoxValueInputStylingProps from "../input/BoxValue/BoxValueInputStylingProps";

export default interface SwitchStylingProps extends WrappedElementStylingProps, BoxValueInputStylingProps
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