import React, { useEffect } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius, spacing } from "../../styles/styles";
import Button from "../input/button";
import { useState } from "react";
import { Style, ThemeColourFunction, useThemeColours, useThemeParser } from "../../styles/theme";
import { PanelProps } from "../../types/components/Panel/PanelProps";

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
`;

const ScrollArea = styled.div
`
	min-height: 15px;
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
`;

const Chevron = styled.div<{$getColour: ThemeColourFunction, $up?: boolean}>
`
	width: 10px;
	height: 10px;
	border-bottom: 2px solid ${props => props.$getColour ("primary")};
	border-right: 2px solid ${props => props.$getColour ("primary")};
	transform: rotate(${props => props.$up ? -135 : 45}deg) translate(-2.5px, -2.5px);
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
								position: "sticky",
								top: 0,
								height: 30,
								width: 30,
								backgroundColor: "unset",
								borderRadius: "100%"
							}}
						>
							<Chevron $getColour = {getColour} $up = {!isCollapsed}/>
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