import { Style } from "../../styles";
import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";

export default interface SliderStylingProps extends WrappedElementStylingProps
{
	/**
	 * Defines the style of the slider bar.
	 * This object abstracts the underlying complex styling for `<input type = "range"/>` which is encapsulated.
	 * For more info on how to use, check the documentation.
	 */
	style?: Style;
	/**
	 * Defines the style of the slider thumb
	 */
	thumbStyle?: Style;
}