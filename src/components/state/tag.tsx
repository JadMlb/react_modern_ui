import React from "react";
import styled from "styled-components";
import { colour, radius, spacing } from "../../styles/styles";
import { TagRole } from "../../types/Tag";
import ThemeType from "../../types/theme";
import { useTheme } from "../../styles/theme";

const Background = styled.div<{$col: string, $whiteText?: boolean, $rounded?: boolean, $theme: ThemeType}>
`
	background-color: ${props => props.$col};
	color: ${props => colour ("black", props.$theme)};
	text-align: center;
	width: min-content;
	padding: ${spacing.xsmall};
	border-radius: ${props => props.$rounded ? radius.large : radius.small};
	${props => props.$whiteText && "color: white;"}
`;

type TagProps = {
	role: TagRole,
	rounded?: boolean,
	children: React.ReactNode
};

export default function Tag ({role = "neutral", rounded, children}: TagProps)
{
	const {theme} = useTheme();
	
	let bgCol = "";
	switch (role)
	{
		case "warn-light": bgCol = "affirmative"; break;
		case "warn-medium": bgCol = "alert"; break;
		case "warn-severe": bgCol = "error"; break;
		default: bgCol = "gray";
	}
	
	return (
		<Background
			$col = {colour (bgCol as "affirmative" | "alert" | "error" | "gray", theme)}
			$whiteText = {role === "warn-light" || role === "warn-severe"}
			$rounded = {rounded}
			$theme = {theme}
		>
			{children}
		</Background>
	);
}