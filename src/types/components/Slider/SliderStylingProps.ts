import { Style } from "../../styles";

export default interface SliderStylingProps
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