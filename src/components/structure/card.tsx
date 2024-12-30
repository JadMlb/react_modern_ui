/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius, spacing } from "../../styles/styles";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { Colour } from "../../types";
import React from "react";

const CardBg = styled.div<{$mediaPosition: "left" | "top" | "right" | "bottom", $containsMedia: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	position: relative;
	border-radius: ${radius.normal};
	overflow: hidden;
	border: 0.5px solid ${props => props.$colour (props.$isDark ? "grayDark" : "grayLight")};
	box-shadow: 0 0 5px ${props => props.$colour (props.$isDark ? "grayDark" : "grayLight")};

	width: fit-content;
	height: fit-content;

	${
		props => props.onClick &&
					`cursor: pointer;
					&:hover
					{
						border: 1px solid ${props.$colour ("primary")};
					}`
	}
	
	display: grid;
	gap: ${spacing.small};
	grid-template-${props => ["left", "right"].includes (props.$mediaPosition) ? "column" : "row"}s: repeat(${props => props.$containsMedia ? 2 : 1}, auto);
	grid-template-areas: ${
		props => props.$mediaPosition === "left" ?
					`"m c"` :
					props.$mediaPosition === "right" ?
						`"c m"` :
						props.$mediaPosition === "top" ?
						`"m"
						"c"` :
						`"c"
						"m"`
	};
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

const CardHeader = styled.div
`
	display: flex;
	align-items: center;
	gap: ${spacing.small};
`;

const CardContent = styled.div<{$width?: number, $height?: number, $mediaPosition: "left" | "top" | "right" | "bottom"}>
`
	grid-area: c;
	padding: ${spacing.normal};
	padding-${props => props.$mediaPosition}: unset;

	width: ${props => props.$width ? `${props.$width}px` : "fit-content"};
	height: ${props => props.$height ? `${props.$height}px` : "fit-content"};
`;

const CardMedia = styled.img<{$position: "left" | "top" | "right" | "bottom"}>
`
	align-self: center;

	${
		props => ["left", "right"].includes (props.$position) ?
			`width: auto; height: calc(${props.height}px + 2 * ${spacing.normal})`:
			`height: auto; width: calc(${props.width}px + 2 * ${spacing.normal})`
	}
`;

type CardProps = {
	key?: string | number | bigint | null
	title?: string,
	/**
	 * The subtitle is displayed in a gray & smaller font size
	 */
	subtitle?: string,
	/**
	 * The source (image or svg path) of the leading graphics to be displayed in an image before the title. The property `leadingSize` controls the dimensions of this image.
	 */
	leading?: string,
	/**
	 * The size (width and height) in px of the leading element. Defaults to `20`px.
	 */
	leadingSize?: number,
	/**
	 * The source (image or svg path) of the graphics to be displayed in image inside of the card.
	 */
	media?: string,
	/**
	 * Defines the position of the media element
	 */
	mediaPosition?: "left" | "top" | "right" | "bottom",
	/**
	 * The width of the card component
	 */
	width?: number,
	/**
	 * The height of the card component
	 */
	height?: number,
	/**
	 * The content of the card's body
	 */
	children?: React.ReactNode,
	/**
	 * Event handler fired when the card is clicked
	 */
	onClick?: React.MouseEventHandler
};

/**
 * Renders a visible, elevated wrapper around the content with a title and a subtitle
 */
export default function Card ({title, subtitle, leading, leadingSize = 20, media, mediaPosition = "top", width, height, children, onClick}: CardProps)
{
	const colour = useThemeColours();
	const isDark = useDarkMode();

	return (
		<CardBg
			$isDark = {isDark}
			$colour = {colour}
			$mediaPosition = {mediaPosition}
			$containsMedia = {media !== undefined}
			onClick = {onClick}
		>
			<CardContent $width = {width} $height = {height} $mediaPosition = {mediaPosition}>
				<CardHeader>
					{leading && <img src = {leading} width = {leadingSize} height = {leadingSize}/>}
					{title && <Title>{title}</Title>}
				</CardHeader>
				{subtitle && <Small $colour = {colour}>{subtitle}</Small>}
				{children}
			</CardContent>
			{media && <CardMedia src = {media} $position = {mediaPosition} width = {width} height = {height}/>}
		</CardBg>
	);
}