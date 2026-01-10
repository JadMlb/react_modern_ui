import { CardProps, StaticStyle } from "../../../types";

interface CardSubtitleProps
{
	contents?: CardProps["subtitle"];
	style?: StaticStyle;
}

export default function CardSubtitle ({contents, style}: CardSubtitleProps)
{
	if (!contents)
		return null;

	return (
		<p css = {style}>
			{contents}
		</p>
	);
}