import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { spacing } from "../../styles/styles";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { Colour } from "../../types";
import { CardProps } from "../../types/components/Card/CardProps";
import { ParserFactory } from "../../types/components/styles/generic/ParserFactory";
import { ActionElementStyle } from "../../types/components/styles/actionElement/ActionElementStyle";
import { DEFAULT_CARD_STYLE } from "../../types/components/Card/CardStyle";
import { Parser } from "../../types/components/styles/generic/Parser";

const CardBg = styled.div<{$css: string, $mediaPosition: "left" | "top" | "right" | "bottom", $containsMedia: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	position: relative;
	overflow: hidden;
	${
		props => props.onClick && `cursor: pointer;`
	}
	
	display: grid;
	gap: ${spacing.small};
	grid-template-${props => ["left", "right"].includes (props.$mediaPosition) ? "column" : "row"}s: repeat(${props => props.$containsMedia ? 2 : 1}, auto);
	grid-template-areas: ${
		props => props.$mediaPosition === "left" ?
					`"${props.$containsMedia ? "m " : ""}c"` :
					props.$mediaPosition === "right" ?
						`"c${props.$containsMedia ? " m" : ""}"` :
						props.$mediaPosition === "top" ?
						`${props.$containsMedia ? "\"m\"" : ""}
						"c"` :
						`"c"
						${props.$containsMedia ? "\"m\"" : ""}`
	};

	> :not(.card-content)
	{
		align-self: center;
		justify-self: center;
	}

	${props => props.$css}
`;

const Title = styled.h4
`
	margin: unset;
	font-size: larger;
`;

const Small = styled.p<{$colour: (col: Colour) => string}>
`
	font-size: smaller;
	color: ${props => props.$colour ("gray")};
	margin: unset;
`;

const CardContent = styled.div<{$width?: number, $height?: number, $mediaPosition: "left" | "top" | "right" | "bottom", $containsMedia: boolean}>
`
	grid-area: c;
	padding: ${spacing.normal};
	${props => props.$containsMedia && `padding-${props.$mediaPosition}: unset;`}

	width: 1fr;
	height: 1fr;
	/*width: ${props => props.$width ? `${props.$width}px` : "fit-content"};
	height: ${props => props.$height ? `${props.$height}px` : "fit-content"};*/
`;

/**
 * Renders a visible, elevated wrapper around the content with a title and a subtitle
 */
export default function Card ({className, style, title, subtitle, media, mediaPosition = "top", children, onClick}: CardProps)
{
	const colour = useThemeColours();
	const isDark = useDarkMode();

	const parserFactory = new ParserFactory (colour);
	const [css, setCss] = useState ("");
	const [realStyle, setRealStyle] = useState<ActionElementStyle> ();

	useEffect (
		() =>
		{
			const DEFAULT_STYLE = DEFAULT_CARD_STYLE (onClick !== undefined, isDark ? "dark" : "light");
			if (DEFAULT_STYLE)
				setRealStyle ({...DEFAULT_STYLE, ...style});
		},
		[style, onClick, isDark]
	);
	
	useEffect (
		() =>
		{
			if (realStyle)
				setCss ((parserFactory.getParser("") as Parser<ActionElementStyle>).parse (realStyle));
		},
		[realStyle]
	);

	return (
		<CardBg
			className = {className}
			$isDark = {isDark}
			$colour = {colour}
			$mediaPosition = {mediaPosition}
			$containsMedia = {media !== undefined}
			$css = {css}
			onClick = {onClick}
		>
			<CardContent
				className = "card-content"
				$mediaPosition = {mediaPosition}
				$containsMedia = {!!media}
			>
				{title && <Title>{title}</Title>}
				{subtitle && <Small $colour = {colour}>{subtitle}</Small>}
				{children}
			</CardContent>
			{/* {media && <CardMedia src = {media} $position = {mediaPosition} width = {width} height = {height}/>} */}
			{media}
		</CardBg>
	);
}