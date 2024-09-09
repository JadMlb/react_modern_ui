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
	items: TableRow[],
	mapper: (item: TableRow) => React.ReactNode
};

export default function DraggableList ({items, mapper}: DraggableListProps)
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