import { useEffect } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius, spacing } from "../../styles/styles";
import Button from "../input/button";
import { useState } from "react";
import { Style, ThemeColourFunction, useThemeColours, useThemeParser } from "../../styles/theme";
import { PanelProps } from "../../types/components/Panel/PanelProps";
import Chevron from "../chevron";

const PanelDiv = styled.div<{$border: boolean, $colour: ThemeColourFunction}>
`
	position: relative;
	padding: ${spacing.small};
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};

	${
		props => props.$border &&
					`
						border-radius: ${radius.normal};
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

const ScrollArea = styled.div
`
	min-height: 15px;
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
`;

/**
 * Wraps the contents inside their own division, with the ability to add a title. In the latter case, a border is shown around the panel.
 */
export default function Panel ({id, className, style, title, collapsible = false, children}: PanelProps)
{
	const getColour = useThemeColours();
	const [isCollapsed, setIsCollapsed] = useState (true);

	const parseTheme = useThemeParser();
	const [css, setCss] = useState<Style> ({});

	useEffect (
		() =>
		{
			if (style)
				setCss (parseTheme (style));
		},
		[style, parseTheme]
	);

	return (
		<PanelDiv
			$border = {title !== undefined && title !== null}
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