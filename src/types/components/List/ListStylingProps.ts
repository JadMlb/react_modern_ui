import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export default interface GenericListStylingProps<T> extends StylingProps<T>
{
	/**
	 * Customizes the style of the wrapper `li` component that wraps the `render` function result
	 */
	listItemStyle?: Style<T>;
	/**
	 * Customizes the style of the space between list elements when `draggable` is enabled.
	 */
	listItemDropAreaStyle?: Style<T>;
}