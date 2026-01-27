/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import DraggableListItem from "./list_item";
import ListDropArea from "./drop_area";
import { ListProps } from "../../../types/components/List/ListProps";
import { ListContainer } from "./container";
import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";

export default function List (instanceProps: ListProps)
{
	const props = useProps ("list", instanceProps);
	const {
		className,
		dragHandle,
		draggable,
		id,
		listItemDropAreaStyle,
		listItemStyle,
		onChange,
		onDrag,
		onDrop,
		renderer,
		style,
		items,
		...aria
	} = props;

	const css = useStyle ("list", props, style);
	const listItemDropAreaCss = useStyle ("list", props, listItemDropAreaStyle, "listItemDropAreaStyle");
	const listItemCss = useStyle ("list", props, listItemStyle, "listItemStyle");

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
	
	return (
		<ListContainer
			id = {id}
			className = {className}
			style = {css}
			{...aria}
		>
			{draggable && <ListDropArea style = {listItemDropAreaCss}/>}
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
								style = {listItemCss}
							>
								{renderer?. (item)}
							</DraggableListItem>
							{draggable && <ListDropArea style = {listItemDropAreaCss}/>}
						</React.Fragment>
					)
				)
			}
		</ListContainer>
	);
}