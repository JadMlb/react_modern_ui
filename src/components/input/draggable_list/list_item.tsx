import React from "react";
import { colour, radius, spacing } from "../../../styles/styles";
import { useDarkMode, useTheme } from "../../../styles/theme";
import "./list.css";

type DraggableListItemProps = {
	key?: string | number | bigint | null,
	onDragStart: React.DragEventHandler,
	onDragEnter: React.DragEventHandler,
	onDragEnd: React.DragEventHandler,
	dragging?: boolean,
	children: React.ReactNode
};

export default function DraggableListItem ({onDragStart, onDragEnter, onDragEnd, dragging, children}: DraggableListItemProps)
{
	const isDark = useDarkMode();
	const {theme} = useTheme();

	return (
		<li
			className = {`draggable-list-item ${dragging ? "draggable-list-item-dragging" : ""}`}
			style = {{
				padding: spacing.xsmall,
				borderRadius: radius.small,
				border: `1px solid ${colour (isDark ? "grayDark" : "grayLight", theme)}`,
				boxShadow: `0 0 5px ${colour (isDark ? "grayDark" : "grayLight", theme)}`,
				paddingLeft: `calc(2 * ${spacing.xsmall} + 5px)`,
			}}
			onDragStart = {onDragStart}
			onDragEnter = {onDragEnter}
			onDragOver = {e => e.preventDefault()}
			onDragEnd = {onDragEnd}
			draggable
		>
			{children}
		</li>
	);
}