import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";
import { ListItemContents } from "./ListProps";

export default interface ListStylingProps extends StylingProps
{
	/**
	 * A mapper function that takes an item from the list provided and renders a JSX element placed inside of a draggable list item
	 * @param item The raw data of an element in the list
	 * @returns The contents of a list item
	 */
	renderer: (item: ListItemContents) => React.ReactNode;
	/**
	 * Customizes the style of the wrapper `li` component that wraps the `render` function result
	 */
	listItemStyle?: Style;
}