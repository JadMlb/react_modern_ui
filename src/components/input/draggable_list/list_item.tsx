import React from "react";
import styled from "styled-components";
import { colour, radius, spacing, useDarkMode, useTheme } from "../../../styles";
import ThemeType from "../../../types/theme";

const LI = styled.li<{$isDark: boolean, $theme: ThemeType}>
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
`;

type DraggableListItemProps = {
	key?: string | number | bigint | null,
	onDragStart: React.DragEventHandler,
	onDragEnter?: React.DragEventHandler
	children: React.ReactNode
};

export default function DraggableListItem ({onDragStart, onDragEnter, children}: DraggableListItemProps)
{
	const isDark = useDarkMode();
	const {theme} = useTheme();

	return (
		<LI
			$isDark = {isDark}
			$theme = {theme}
			onDragStart = {onDragStart}
			onDragEnter = {onDragEnter}
			draggable
		>
			{children}
		</LI>
	);
}