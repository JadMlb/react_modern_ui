import React from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { colour, radius, spacing } from "../../styles/styles";
import { TagRole } from "../../types/Tag";
import { useTheme } from "../../styles/theme";
import { ThemeType } from "../../types/theme";

const Background = styled.div<{$col: string, $centered: boolean, $whiteText?: boolean, $rounded?: boolean, $theme: ThemeType}>
`
	background-color: ${props => props.$col};
	color: ${props => colour ("black", props.$theme)};
	${props => props.$centered && `text-align: center; width: min-content;`}
	padding: ${spacing.xsmall};
	border-radius: ${props => props.$rounded ? radius.large : radius.small};
	${props => props.$whiteText && "color: white;"}
	display: inline-block;
`;

type TagProps = {
	key?: string | number | bigint | null
	role: TagRole,
	rounded?: boolean,
	centered?: boolean,
	children: React.ReactNode
};

export default function Tag ({role = "neutral", centered = false, rounded, children}: TagProps)
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
			$col = {colour(bgCol as "affirmative" | "alert" | "error" | "gray", theme)}
			$theme = {theme}
			$centered = {centered} 
			$rounded = {rounded}
			$whiteText = {["warn-light", "warn-severe"].includes (role)}
		>
			{children}
		</Background>
	);
}