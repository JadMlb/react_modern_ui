import React from "react";
import styled, { css } from "styled-components";
import { colour, radius, spacing } from "../../../styles/styles";
import ThemeType from "../../../types/theme";
import { useDarkMode, useTheme } from "../../../styles/theme";

const LI = styled.li<{$dragging?: boolean, $isDark: boolean, $theme: ThemeType}>
`
	padding: ${spacing.xsmall};
	border-radius: ${radius.small};
	border: 1px solid ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
	box-shadow: 0 0 5px ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
	margin-inline: none;
	position: relative;
	padding-left: calc(2 * ${spacing.xsmall} + 5px) !important;

	&:before
	{
		content: "\22ee";
		font-weight: bold;
		position: absolute;
		left: ${spacing.xsmall};
	}

	${
		props => props.$dragging &&
			css
			`
				all: unset;
				color: transparent;
			`
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
			$isDark = {isDark}
			$theme = {theme}
			onDragStart = {onDragStart}
			onDragEnter = {onDragEnter}
			onDragOver = {e => e.preventDefault()}
			onDragEnd = {onDragEnd}
			$dragging = {dragging}
			draggable
		>
			{children}
		</LI>
	);
}