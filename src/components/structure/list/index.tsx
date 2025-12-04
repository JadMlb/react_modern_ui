/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useRef, useState } from "react";
import DraggableListItem from "./list_item";
import ListSeparator from "./separator";
import ListProps from "../../../types/components/List/ListProps";
import { Style, useThemeParser } from "../../../styles";

interface ListContainerProps
{
	id?: string;
	classname?: string;
	style?: Style;
	children: React.ReactNode;
}

function ListContainer ({style, children}: ListContainerProps)
{
	const parseCss = useThemeParser();

	const styles = useMemo (
		() => parseCss ({
			padding: "unset",
			margin: "unset",
			listStyleType: "none",
			display: "flex",
			flexDirection: "column",
			gap: "spacing.xsmall",
			...style
		}),
		[style]
	);

	return (
		<ul css = {styles}>
			{children}
		</ul>
	);
}

export default function List ({id, className, style, items, renderer, draggable, dragHandle, listItemStyle, onDrag, onDrop, onChange}: ListProps)
{
	const [list, setList] = useState (items);

	const draggedIndex = useRef<number | null> (null);
	const draggedOverIndex = useRef<number | null> (null);

	function onDragStart (index: number)
	{
		if (!draggable)
			return;

		draggedIndex.current = index;
		onDrag?. (list[index], index);
	}

	function onDragEnter (index: number)
	{
		if (!draggable)
			return;
		draggedOverIndex.current = index;
	}

	function onDragEnd ()
	{
		if (!draggable)
			return;

		let newList = [...list];
		newList.splice (draggedOverIndex.current!, 0, newList.splice(draggedIndex.current!, 1)[0])
		
		onChange?. (newList);
		onDrop?. (list[draggedIndex.current!], draggedIndex.current!, draggedOverIndex.current!);

		setList (newList);
		draggedOverIndex.current = null;
		draggedIndex.current = null;
	}

	useEffect (
		() => setList (items),
		[items]
	);
	
	return (
		<ListContainer
			id = {id}
			classname = {className}
			style = {style}
		>
			{draggable && <ListSeparator/>}
			{
				list.map (
					(item, index) => (
						<React.Fragment key = {item.id}>
							<DraggableListItem
								onDragStart = {() => onDragStart (index)}
								onDragEnter = {() => onDragEnter (index)}
								onDragEnd = {onDragEnd}
								dragging = {draggedIndex.current === index}
								draggable = {draggable}
								handle = {dragHandle}
								style = {listItemStyle}
							>
								{renderer (item)}
							</DraggableListItem>
							{draggable && <ListSeparator/>}
						</React.Fragment>
					)
				)
			}
		</ListContainer>
	);
}