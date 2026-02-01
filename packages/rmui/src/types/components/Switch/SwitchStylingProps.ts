import { Style } from "../../styles";
import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";
import BoxValueInputStylingProps from "../input/BoxValue/BoxValueInputStylingProps";

export default interface GenericSwitchStylingProps<T> extends WrappedElementStylingProps<T>, BoxValueInputStylingProps<T>
{
	/**
	 * Customises the styling of the slider background
	 */
	style?: Style<T>;
	/**
	 * Customises the styling of the slider background when the switch is on, a.k.a when `value` is `true`
	 */
	activatedStyle?: Style<T>;
	/**
	 * Customises the styling of the wrapper holding the switch and the label
	 */
	parentStyle?: Style<T>;
	/**
	 * Customises the styling of the slider handle
	 */
	handleStyle?: Style<T>;
	/**
	 * Customises the styling of the slider handle when the switch is on, a.k.a when `value` is `true`
	 */
	activatedHandleStyle?: Style<T>;
}