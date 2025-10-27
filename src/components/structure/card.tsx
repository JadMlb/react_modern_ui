import { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Style, useDarkMode, useThemeColours, useThemeParser } from "../../styles/theme";
import { Colour } from "../../types";
import { CardProps } from "../../types/components/Card/CardProps";
import { DEFAULT_CARD_STYLE } from "../../types/components/Card/CardStyle";

const CardBg = styled.div<{$mediaPosition: "left" | "top" | "right" | "bottom", $containsMedia: boolean}>
`
	position: relative;
	overflow: hidden;
	${
		props => props.onClick && `cursor: pointer;`
	}
	
	display: grid;
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

	> :not(.rmui-card-content)
	{
		align-self: center;
		justify-self: center;
	}
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

const CardContent = styled.div<{$mediaPosition: "left" | "top" | "right" | "bottom", $containsMedia: boolean}>
`
	grid-area: c;
	${props => props.$containsMedia && `padding-${props.$mediaPosition}: unset;`}

	width: 1fr;
	height: 1fr;
`;

/**
 * Renders a visible, elevated wrapper around the content with a title and a subtitle
 */
export default function Card ({id, className, style, title, subtitle, media, mediaPosition = "top", children, onClick}: CardProps)
{
	const colour = useThemeColours();
	const isDark = useDarkMode();

	const parseTheme = useThemeParser();
	const [css, setCss] = useState<Style> ({});

	useEffect (
		() =>
		{
			const DEFAULT_STYLE = DEFAULT_CARD_STYLE (onClick !== undefined, isDark ? "dark" : "light");
			if (DEFAULT_STYLE)
				setCss (parseTheme ({...DEFAULT_STYLE, ...style}));
		},
		[style, onClick, isDark, parseTheme]
	);

	return (
		<CardBg
			css = {css}
			className = {className}
			id = {id}
			$mediaPosition = {mediaPosition}
			$containsMedia = {media !== undefined}
			onClick = {onClick}
		>
			<>{
				(title || subtitle || children) &&
				<CardContent
					className = "rmui-card-content"
					$mediaPosition = {mediaPosition}
					$containsMedia = {!!media}
				>
					{title && <Title>{title}</Title>}
					{subtitle && <Small $colour = {colour}>{subtitle}</Small>}
					{children}
				</CardContent>
			}</>
			{media}
		</CardBg>
	);
}