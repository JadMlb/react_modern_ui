import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { spacing } from "../../../styles";
import { TableRow } from "../../../types/TableRow";
import DraggableListItem from "./list_item";

const Container = styled.div
`
	padding: unset;
	margin: unset;

	list-style-type: none;

	display: flex;
	flex-direction: column;
	gap: ${spacing.xsmall};
`;

type DraggableListProps = {
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
	const [isDragging, setIsDragging] = useState (false);

	const draggedIndex = useRef<number | null> (null);
	const draggedOverIndex = useRef<number | null> (null);

	function onDragStart (index: number)
	{
		draggedIndex.current = index;
		// introduce a slight delay so that the styling is not applied directly to the element hovered but its old place
		// credits: asat on youtube: https://youtu.be/Q1PYQPK9TaM?si=jptC93an2cmmPw7c
		setTimeout (() => setIsDragging (true), 0);
	}

	function onDragEnter (index: number)
	{
		draggedOverIndex.current = index;
	}

	function onDragEnd ()
	{
		setList (
			old =>
			{
				let newList = JSON.parse (JSON.stringify (old));
				newList.splice (draggedOverIndex.current!, 0, newList.splice(draggedIndex.current!, 1)[0])
				if (onChange)
					onChange (newList);
				return newList;
			}
		);
		draggedOverIndex.current = null;
		draggedIndex.current = null;
		setIsDragging (false);
	}

	useEffect (
		() => setList (items),
		[items]
	);
	
	return (
		<Container>
		{
			list.map (
				(item, index) => <DraggableListItem
									key = {item.id}
									onDragStart = {() => onDragStart (index)}
									onDragEnter = {() => onDragEnter (index)}
									onDragEnd = {onDragEnd}
									dragging = {isDragging}
								>
									{mapper (item)}
								</DraggableListItem>
			)
		}
		</Container>
	);
}