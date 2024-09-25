import React, { useEffect, useRef, useState } from "react";
import { spacing } from "../../../styles/styles";
import { TableRow } from "../../../types/TableRow";
import DraggableListItem from "./list_item";
import "./list.css";

export type DraggableListProps = {
	key?: string | number | bigint | null,
	/**
	 * The list of items characterized by an id and key-value content
	 */
	items: TableRow[],
	/**
	 * A mapper function that takes an item from the list provided and renders a JSX element
	 * @param item The raw data of an element in the list
	 * @returns The JSX Element to be inserted in the list item
	 */
	mapper: (item: TableRow) => React.ReactNode
	/**
	 * The event handler to fire whenever the items are rearranged
	 * @param items The new arrangement of items
	 */
	onChange?: (items: TableRow[]) => void
};

export default function DraggableList ({items, mapper, onChange}: DraggableListProps)
{
	const [list, setList] = useState (items);

	const draggedIndex = useRef<number | null> (null);
	const draggedOverIndex = useRef<number | null> (null);

	function onDragStart (index: number)
	{
		draggedIndex.current = index;
	}

	function onDragEnter (index: number)
	{
		draggedOverIndex.current = index;
	}

	function onDragEnd ()
	{
		let newList = JSON.parse (JSON.stringify (list));
		newList.splice (draggedOverIndex.current!, 0, newList.splice(draggedIndex.current!, 1)[0])
		if (onChange)
			onChange (newList);
		setList (newList);
		draggedOverIndex.current = null;
		draggedIndex.current = null;
	}

	useEffect (
		() => setList (items),
		[items]
	);
	
	return (
		<ul className = "draggable-list-container" style = {{gap: spacing.xsmall}}>
		{
			list.map (
				(item, index) => <DraggableListItem
									key = {item.id}
									onDragStart = {() => onDragStart (index)}
									onDragEnter = {() => onDragEnter (index)}
									onDragEnd = {onDragEnd}
									dragging = {draggedIndex.current === index}
								>
									{mapper (item)}
								</DraggableListItem>
			)
		}
		</ul>
	);
}