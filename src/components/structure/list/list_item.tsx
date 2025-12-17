/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

interface DraggableListItemProps
{
	draggable?: boolean;
	onDragStart: React.DragEventHandler;
	onDragEnter: React.DragEventHandler;
	onDragEnd: React.DragEventHandler;
	dragging?: boolean;
	handle?: React.ReactNode | null;
	style?: Style;
	children: React.ReactNode;
};

export default function DraggableListItem ({draggable, onDragStart, onDragEnter, onDragEnd, dragging, handle, style, children}: DraggableListItemProps)
{
	const injectedStyle = useMemo (
		() => ({
			opacity: dragging ? 0.5 : 1,
		}),
		[dragging]
	);

	const css = useStyle ("list", style, injectedStyle, "listItemStyle");

	return (
		<li
			css = {css}
			onDragStart = {onDragStart}
			onDragEnter = {onDragEnter}
			onDragOver = {e => e.preventDefault()}
			onDragEnd = {onDragEnd}
			draggable = {draggable}
		>
			{
				handle !== null && draggable && handle
			}
			{children}
		</li>
	);
}