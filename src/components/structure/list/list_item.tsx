/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import { Style, useDarkMode, useThemeParser } from "../../../styles";
import DefaultDragHandle from "./drag_handle";

const DEFAULT_LI_STYLE = {
	padding: "spacing.xsmall",
	borderRadius: "radius.small",
	paddingLeft: "calc(2 * spacing.xsmall + 5px)",
	marginInline: "unset",
	position: "relative",
	display: "flex",
	alignItems: "center",
	gap: "spacing.medium"
} satisfies Style;

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
	const isDark = useDarkMode();
	const parseCss = useThemeParser();

	const computedStyle = useMemo (
		() => parseCss ({
			...DEFAULT_LI_STYLE,
			border: `1px solid ${isDark ? "grayDark" : "grayLight"}`,
			boxShadow: `0 0 5px ${isDark ? "grayDark" : "grayLight"}`,
			opacity: dragging ? 0.5 : 1,
			...style
		}),
		[isDark, dragging, style]
	);

	return (
		<li
			css = {computedStyle}
			onDragStart = {onDragStart}
			onDragEnter = {onDragEnter}
			onDragOver = {e => e.preventDefault()}
			onDragEnd = {onDragEnd}
			draggable = {draggable}
		>
			{
				handle !== null && draggable && (handle ?? <DefaultDragHandle/>)
			}
			{children}
		</li>
	);
}