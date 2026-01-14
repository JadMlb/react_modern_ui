import { CardProps, CardStylingProps, Overridable, OverridableCardProps } from "../../../types";

function line (contents: string, condition: boolean)
{
	if (!condition)
		return "";
	return contents;
}

function quote (contents: string, condition: boolean)
{
	const quote = condition ? '"' : "";
	return `${quote}${contents}${quote}`;
}

function getGridAreas (mediaPosition: CardProps["mediaPosition"] = "left", media: CardProps["media"], title: CardProps["title"], subtitle: CardProps["subtitle"], children: CardProps["children"])
{
	const mediaExists = !!media;
	const titleExists = !!title;
	const subtitleExists = !!subtitle;
	const contentsExist = !!children;
	const mediaArea = media ? "media" : "";
	const titleArea = title ? "title" : "";
	const subtitleArea = subtitle ? "subtitle" : "";
	const mediaOrTitle = mediaExists || titleExists;
	const mediaOrSubtitle = mediaExists || subtitleExists;
	const mediaOrContents = mediaExists || contentsExist;

	switch (mediaPosition)
	{
		case "left":
			return `${line (quote (`${mediaArea} ${titleArea}`, mediaOrTitle), titleExists)}
			${line (quote (`${mediaArea} ${subtitleArea}`, mediaOrSubtitle), subtitleExists)}
			${line (quote (`${mediaArea} contents`, mediaOrContents), contentsExist)}
			`;
		case "right":
			return `${line (quote (`${titleArea} ${mediaArea}`, mediaOrTitle), titleExists)}
			${line (quote (`${subtitleArea} ${mediaArea}`, mediaOrSubtitle), subtitleExists)}
			${line (quote (`contents ${mediaArea}`, mediaOrContents), contentsExist)}
			`;
		case "top":
			return `${line (quote (mediaArea, mediaExists), mediaExists)}
			${line (quote (titleArea, titleExists), titleExists)}
			${line (quote (subtitleArea, subtitleExists), subtitleExists)}
			${line ("contents", contentsExist)}
			`;
		case "bottom":
			return `${line (quote (titleArea, titleExists), titleExists)}
			${line (quote (subtitleArea, subtitleExists), subtitleExists)}
			${line ("contents", contentsExist)}
			${line (quote (mediaArea, mediaExists), mediaExists)}
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
		style: (isDark, {onClick, mediaPosition, media, title, subtitle, children}) => ({
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
			gridTemplateAreas: getGridAreas (mediaPosition, media, title, subtitle, children)
		})
	}
};

export default DEFAULT_CARD_PROPS;