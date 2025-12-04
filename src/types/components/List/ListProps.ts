import { Style } from "../../../styles";
import { GenericProps } from "../GenericProps";
import { TableRowData } from "../Table/TableRowData";

export type ListItemContents = TableRowData & {id: string | number};

export default interface ListProps extends GenericProps
{
	/**
	 * The list of items characterized by an id and key-value content
	 */
	items: ListItemContents[];
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
	/**
	 * Boolean flag that signals if the items can be reordered by drag and drop
	 */
	draggable?: boolean;
	/**
	 * The element representing the handle to indicate that the item is draggable.
	 * If `null` is provided, no handle is rendered
	 */
	dragHandle?: React.ReactNode | null;
	/**
	 * The callback function fired when dragging an element.
	 * @param item The current dragged item
	 * @param index The index from which this item was dragged
	 */
	onDrag?: (item: ListItemContents, index: number) => void;
	/**
	 * The callback function fired when the dragged item is dropped
	 * @param item The dragged item
	 * @param oldIndex The dragged item's old index
	 * @param newIndex The dragged item's new index at which it is dropped
	 */
	onDrop?: (item: ListItemContents, oldIndex: number, newIndex: number) => void;
	/**
	 * The event handler fired whenever the items are rearranged
	 * @param items The new arrangement of items
	 */
	onChange?: (items: ListItemContents[]) => void;
}