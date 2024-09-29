import React from "react";
import { colour, radius, spacing } from "../../../styles/styles";
import { useDarkMode, useTheme } from "../../../styles/theme";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ThemeType } from "../../../types/theme";

const LI = styled.li<{$dragging?: boolean, $isDark: boolean, $theme: ThemeType}>
`
	padding: ${spacing.xsmall};
	border-radius: ${radius.small};
	border: 1px solid ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
	box-shadow: 0 0 5px ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
	padding-left: calc(2 * ${spacing.xsmall} + 5px);

	margin-inline: unset;
	position: relative;

	${
		props => props.$dragging && `
			all: unset;
			color: transparent;
		`
	}

	&:before
	{
		content: "⋮";
		font-weight: bold;
		position: absolute;
		left: ${spacing.small};
	}
`;

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
		<LI
			$dragging = {dragging}
			$isDark = {isDark}
			$theme = {theme}
			onDragStart = {onDragStart}
			onDragEnter = {onDragEnter}
			onDragOver = {e => e.preventDefault()}
			onDragEnd = {onDragEnd}
			draggable
		>
			{children}
		</LI>
	);
}