import { TableRowData } from "../Table/TableRowData";
import ListStylingProps from "./ListStylingProps";

export type ListItemContents = TableRowData & {id: string | number};

export default interface ListProps extends ListStylingProps
{
	/**
	 * The list of items characterized by an id and key-value content
	 */
	items: ListItemContents[];
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

export type OverridableListProps = Pick<ListProps, "draggable" | "dragHandle">;