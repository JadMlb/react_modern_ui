import { CardProps, CardStylingProps, Overridable, OverridableCardProps } from "../../../types";

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

const DEFAULT_CARD_PROPS: Overridable<OverridableCardProps, CardStylingProps> = {
	styles: {
		titleStyle: {
			gridArea: "title",
			margin: "unset"
		},
		subtitleStyle: {
			gridArea: "subtitle",
			fontSize: "0.8em",
			color: "gray",
			margin: "unset"
		},
		style: (isDark, {onClick, mediaPosition, media, title, subtitle}) => ({
			position: "relative",
			overflow: "hidden",
			gap: "spacing.small",
			borderRadius: "radius.medium",
			border: `0.5px solid gray${isDark ? "Dark" : "Light"}`,
			boxShadow: `0 0 5px gray${isDark ? "Dark" : "Light"}`,
			width: "fit-content",
			height: "fit-content !important",
			display: "grid",
			padding: "spacing.small",
			cursor: onClick ? "pointer" : "default",
			":hover": {
				border: onClick ? "1px solid primary" : undefined
			},
			gridTemplateAreas: getGridAreas (mediaPosition, media, title, subtitle)
		})
	}
};

export default DEFAULT_CARD_PROPS;