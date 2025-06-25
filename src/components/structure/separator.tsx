/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { colour, spacing } from "../../styles/styles";
import { Style, useDarkMode, useTheme, useThemeParser } from "../../styles/theme";
import { ThemeType } from "../../types/theme";
import SeparatorProps from "../../types/components/Separator/SeparatorProps";
import { useEffect, useState } from "react";

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
`;

const Wrapper = styled.div
`
	display: flex;
	flex-direction: row;
	gap: ${spacing.small};
`;

const DEFAULT_STYLE = {
	margin: 0,
	padding: 0,
	overflow: "visible",
	height: 1,
	border: 0,
	borderTop: "1px solid primary",
	color: "primary",
} satisfies Style;

/**
 * Draws a horizontal separator with or without a title to distinguish parts
 */
export default function Separator ({id, className, style, title}: SeparatorProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();
	
	const parseCss = useThemeParser();
	const [css, setCss] = useState<Style> (DEFAULT_STYLE);

	useEffect (
		() =>
		{
			if (style)
				setCss (parseCss ({...DEFAULT_STYLE, ...style}));
		},
		[style, parseCss]
	);

	return (
		// <Wrapper>
		// 	{title}
			<HR $isDark={isDark} $theme={theme}/>
			// <hr
			// 	css = {css}
			// 	className = {className}
			// 	id = {id}
		// 	/>
		// </Wrapper>
	);
}