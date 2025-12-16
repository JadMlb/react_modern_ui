import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export default interface CardStylingProps extends StylingProps
{
	/**
	 * Sets the style of the title component
	 */
	titleStyle?: Style;
	/**
	 * Sets the style of the subtitle component
	 */
	subtitleStyle?: Style;
}