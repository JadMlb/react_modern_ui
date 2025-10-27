import { useEffect, useMemo } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Button from "../input/button";
import { useState } from "react";
import { Style, ThemeColourFunction, useTheme, useThemeColours, useThemeParser } from "../../styles/theme";
import { PanelProps } from "../../types/components/Panel/PanelProps";
import Chevron from "../chevron";

const PanelDiv = styled.div<{$border: boolean, $colour: ThemeColourFunction}>
`
	position: relative;
	display: flex;
	flex-direction: column;

	${
		props => props.$border &&
					`
						border: 1px solid ${props.$colour ("primary")};
					`
	}
`;

const Header = styled.div
`
	display: flex;
	flex-direction: row;
	justify-contents: space-between;
	align-items: center;
	position: sticky;
	top: 0;
`;

const ScrollAreaElement = styled.div<{$spacingSmall: string}>
`
	min-height: 15px;
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: ${({$spacingSmall}) => $spacingSmall};
`;

interface ScrollAreaProps
{
	children?: React.ReactNode;
}

function ScrollArea ({children}: ScrollAreaProps)
{
	const {theme} = useTheme();
	const {spacing} = theme.measurements;

	return (
		<ScrollAreaElement $spacingSmall = {spacing.small}>
			{children}
		</ScrollAreaElement>
	);
}

/**
 * Wraps the contents inside their own division, with the ability to add a title. In the latter case, a border is shown around the panel.
 */
export default function Panel ({id, className, style, title, collapsible = false, children}: PanelProps)
{
	const getColour = useThemeColours();
	const [isCollapsed, setIsCollapsed] = useState (true);

	const hasBorder = useMemo (
		() => title !== undefined && title !== null,
		[title]
	);
	const parseTheme = useThemeParser();
	const [css, setCss] = useState<Style> ({});

	useEffect (
		() =>
		{
			setCss (
				parseTheme ({
					padding: "spacing.small",
					gap: "spacing.small",
					borderRadius: "radius.medium",
					...style
				})
			);
		},
		[style, parseTheme]
	);

	return (
		<PanelDiv
			$border = {hasBorder}
			$colour = {getColour}
			css = {css}
			className = {className}
			id = {id}
		>
			{
				title &&
				<Header>
					<div>{title}</div>
					{
						collapsible &&
						<Button
							onClick = {() => setIsCollapsed (old => !old)}
							style = {{
								height: 30,
								width: 30,
								backgroundColor: "unset",
								borderRadius: "100%",
								marginLeft: "auto"
							}}
						>
							<Chevron orientation = {isCollapsed ? "down" : "up"}/>
						</Button>
					}
				</Header>
			}
			{
				(!collapsible || !isCollapsed) &&
				<ScrollArea>{children}</ScrollArea>
			}
		</PanelDiv>
	);
}