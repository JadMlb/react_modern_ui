import styled from "styled-components";
import { colour, radius, spacing } from "../../styles/styles";
import ThemeType from "../../types/theme";
import { useDarkMode, useTheme } from "../../styles/theme";
import React from "react";

const CardBg = styled.div<{$isDark: boolean, $theme: ThemeType}>
`
	border-radius: ${radius.normal};
	padding: ${spacing.small};
	border: 0.5px solid ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
	box-shadow: 0 0 5px ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};

	&:hover
	{
		border: 1px solid ${props => colour ("primary", props.$theme)};
	}
`;

const Title = styled.h4
`
	margin: unset;
	margin-bottom: ${spacing.xsmall};
	font-size: larger;
`;

const Small = styled.p<{$theme: ThemeType}>
`
	font-size: smaller;
	color: ${props => colour ("gray", props.$theme)};
	margin-top: unset;
`;

type CardProps = {
	key?: string | number | bigint | null
	title?: string,
	/**
	 * The description is displayed in a gray & smaller font size
	 */
	description?: string,
	/**
	 * The content of the card's body
	 */
	children?: React.ReactNode,
	/**
	 * Event handler fired when the card is clicked
	 */
	onClick?: React.MouseEventHandler
};

/**
 * Renders a visible, elevated wrapper around the content with a title and a description
 */
export default function Card ({title, description, children, onClick}: CardProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();

	return (
		<CardBg
			$isDark = {isDark}
			$theme = {theme}
			onClick = {onClick}
		>
			<Title>{title}</Title>
			<Small $theme = {theme}>{description}</Small>
			{children}
		</CardBg>
	);
}