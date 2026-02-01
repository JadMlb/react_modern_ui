/** @jsxImportSource @emotion/react */
import React from "react";
import { StaticStyle } from "../../../types";

interface DraggableListItemProps
{
	draggable?: boolean;
	onDragStart: React.DragEventHandler;
	onDragEnter: React.DragEventHandler;
	onDragEnd: React.DragEventHandler;
	dragging?: boolean;
	handle?: React.ReactNode | null;
	style?: StaticStyle;
	children: React.ReactNode;
};

export default function DraggableListItem ({draggable, onDragStart, onDragEnter, onDragEnd, dragging, handle, style, children}: DraggableListItemProps)
{
	return (
		<li
			className = {dragging ? "rmui-list-item-dragging" : undefined}
			css = {style}
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