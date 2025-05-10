import { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { spacing } from "../../styles/styles";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { TagProps } from "../../types/components/Tag/TagProps";
import { ParserFactory } from "../../types/components/styles/generic/ParserFactory";
import { ActionElementStyle } from "../../types/components/styles/actionElement/ActionElementStyle";
import DEFAULT_TAG_STYLE from "../../types/components/Tag/TagStyle";
import { Parser } from "../../types/components/styles/generic/Parser";

const Background = styled.div<{$centered: boolean, $canBeClicked?: boolean, $css: string}>
`
	width: fit-content;
	${props => props.$centered && `text-align: center; width: min-content;`}
	padding-inline: ${spacing.xsmall};
	display: flex;
	gap: ${spacing.xsmall};
	align-items: center;
	cursor: ${props => props.$canBeClicked ? "pointer" : "default"};
	${props => props.$css};
`;

export default function Tag ({id, className, colour = "neutral", centered = false, style, onClick, children}: TagProps)
{
	const isDark = useDarkMode();
	const col = useThemeColours();

	const [realStyle, setRealStyle] = useState<ActionElementStyle>();
	const [css, setCss] = useState<string> ("");

	const factory = new ParserFactory(col).getParser ("") as Parser<ActionElementStyle>;
	
	let bgCol = "gray";
	switch (colour)
	{
		case "success": bgCol = "affirmative"; break;
		case "warning": bgCol = "alert"; break;
		case "error": bgCol = "error"; break;
	}

	useEffect (
		() =>
		{
			setRealStyle ({
				...DEFAULT_TAG_STYLE (isDark, bgCol as "gray" | "alert" | "affirmative" | "error"),
				...style
			});
		},
		[colour, isDark, style]
	);

	useEffect (
		() =>
		{
			if (realStyle)
				setCss (factory.parse (realStyle));
		},
		[realStyle, factory]
	);
	
	return (
		<Background
			id = {id}
			className = {className}
			$centered = {centered}
			$canBeClicked = {Boolean (onClick)} 
			$css = {css}
			onClick = {onClick}
		>
			{children}
		</Background>
	);
}