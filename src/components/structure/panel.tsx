import React from "react";
import styled, { css } from "styled-components";
import { colour, radius, spacing } from "../../styles/styles";
import { Button } from "../input";
import { useState } from "react";
import ThemeType from "../../types/theme";
import { useDarkMode, useTheme } from "../../styles/theme";

const PanelDiv = styled.div<{$border: boolean, $theme: ThemeType}>
`
	position: relative;
	/* padding: ${spacing.xsmall}; */

	${
		props => props.$border &&
					css
					`
						border-radius: ${radius.normal};
						border: 1px solid ${colour ("primary", props.$theme)};
					`
	}
`;

const ScrollArea = styled.div<{$isDark: boolean, $maxHeight?: number, $maxWidth?: number, $collapsable?: boolean, $collapsed?: boolean, $theme: ThemeType}>
`
	${props => props.$maxWidth && css`max-width: ${props.$maxWidth}px;`}
	${props => props.$maxHeight && css`max-height: ${props.$maxHeight}px;`}
	padding: ${spacing.small};
	min-width: calc(100% - 2 * ${spacing.small});
	min-height: 15px;
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};

	${
		props => props.$collapsable &&
			css
			`
				> :last-child
				{
					margin-left: auto;
					font-size: 10pt;

					position: absolute;
					bottom: ${spacing.small};
					right: ${spacing.small};
				}
			`
	}

	> span:first-child
	{
		background-color: ${props => colour (props.$isDark ? "black" : "white", props.$theme)};
		position: absolute;
		top: -0.4rem;
		left: calc(${spacing.small} - ${spacing.xsmall});
		padding: 0 ${spacing.xsmall};
		font-size: 0.8rem;
		font-weight: bold;
		color: ${props => colour ("primary", props.$theme)};
	}
`;

type PanelProps = {
	title?: string,
	maxWidth?: number,
	maxHeight?: number,
	collapsable?: boolean,
	children: React.ReactNode
};

/**
 * 
 * 
 * @param title 
 * @param maxWidth 
 * @param maxHeight 
 * @param collapsable 
 */
export default function Panel ({title, maxWidth, maxHeight, collapsable = false, children}: PanelProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();
	const [isCollapsed, setIsCollapsed] = useState (true);

	return (
		<PanelDiv
			$border = {title !== undefined && title !== null}
			$theme = {theme}
		>
			<ScrollArea
				$isDark = {isDark}
				$theme = {theme}
				$maxWidth = {maxWidth}
				$maxHeight = {maxHeight}
				$collapsable = {collapsable}
				$collapsed = {collapsable && isCollapsed}
			>
				<span>{title}</span>
				{
					collapsable ?
						<>
							{!isCollapsed && children}
							<Button
								role = "transparent"
								onClick = {() => setIsCollapsed (old => !old)}
							>
								{isCollapsed ? "Expand" : "Hide"}
							</Button>
						</>
						:
						children
				}
			</ScrollArea>
		</PanelDiv>
	);
}