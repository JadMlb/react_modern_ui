import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export default interface GenericCardStylingProps<T> extends StylingProps<T>
{
	/**
	 * Sets the style of the title component
	 */
	titleStyle?: Style<T>;
	/**
	 * Sets the style of the subtitle component
	 */
	subtitleStyle?: Style<T>;
}