import { useMemo } from "react";
import useStyle from "../../../hooks/useStyle";
import { CardProps } from "../../../types";

function quote (contents: string, condition: boolean)
{
	const quote = condition ? '"' : "";
	return `${quote}${contents}${quote}`;
}

function getGridAreas (mediaPosition: CardProps["mediaPosition"] = "left", media: CardProps["media"], title: CardProps["title"], subtitle: CardProps["subtitle"])
{
	const mediaExists = !!media;
	const titleExists = !!title;
	const subtitleExists = !!subtitle;
	const mediaArea = media ? "media" : "";
	const titleArea = title ? "title" : "";
	const subtitleArea = subtitle ? "subtitle" : "";
	const mediaOrTitle = !!media || !!title;
	const mediaOrSubtitle = !!media || !!subtitle;

	switch (mediaPosition)
	{
		case "left":
			return `${quote (`${mediaArea} ${titleArea}`, mediaOrTitle)}
			${quote (`${mediaArea} ${subtitleArea}`, mediaOrSubtitle)}
			"${mediaArea} contents"
			`;
		case "right":
			return `${quote (`${titleArea} ${mediaArea}`, mediaOrTitle)}
			${quote (`${subtitleArea} ${mediaArea}`, mediaOrSubtitle)}
			"contents ${mediaArea}"
			`;
		case "top":
			return `${quote (mediaArea, mediaExists)}
			${quote (titleArea, titleExists)}
			${quote (subtitleArea, subtitleExists)}
			"contents"
			`;
		case "bottom":
			return `${quote (titleArea, titleExists)}
			${quote (subtitleArea, subtitleExists)}
			"contents"
			${quote (mediaArea, mediaExists)}
			`;
	}
}

type CardContainerProps = Omit<CardProps, "level" | "titleStyle" | "subtitleStyle">;

export default function CardContainer (props: CardContainerProps)
{
	const {
		onClick,
		style,
		children,
		mediaPosition,
		title,
		subtitle,
		media,
		...rest
	} = props;

	const injectedStyles = useMemo (
		() =>
		({
			cursor: onClick ? "pointer" : "default",
			":hover": {
				border: onClick ? "1px solid primary" : undefined
			},
			gridTemplateAreas: getGridAreas (mediaPosition, media, title, subtitle)
		}),
		[onClick, mediaPosition, media, title, subtitle]
	);

	const css = useStyle ("card", style, injectedStyles);
	
	return (
		<div
			{...rest}
			css = {css}
			onClick = {onClick}
		>
			{children}
		</div>
	);
}