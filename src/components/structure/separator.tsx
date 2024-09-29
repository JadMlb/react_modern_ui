import React from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { colour, spacing } from "../../styles/styles";
import { useDarkMode, useTheme } from "../../styles/theme";
import { ThemeType } from "../../types/theme";

type SeparatorProps = {
	key?: string | number | bigint | null,
	/**
	 * The title of the following section
	 */
	title?: string
};

const HR = styled.hr<{$title?: string, $isDark: boolean, $theme: ThemeType}>
`
	margin: 0;
	padding: 0;
	text-align: left;
	overflow: visible;
	height: 1px;
	border: 0;
	border-top: 1px solid ${props => colour ("primary", props.$theme)};
	color: ${props => colour ("primary", props.$theme)};

	&:after
	{
		content: "${props => props.$title}";
		display: inline-block;
		font-size: 0.8rem;
		font-weight: bold;
		background: ${props => colour (props.$isDark ? "black" : "white", props.$theme)};
		position: relative;
		top: calc(-0.4rem - 4px);
		padding-right: ${spacing.xsmall};
	}
`;

/**
 * Draws a horizontal separator with or without a title to distinguish parts
 */
export default function Separator ({title}: SeparatorProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();

	return <HR $title = {title} $isDark = {isDark} $theme = {theme}/>;
}