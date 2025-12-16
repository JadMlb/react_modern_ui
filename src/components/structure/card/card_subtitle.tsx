import useStyle from "../../../hooks/useStyle";
import { CardProps } from "../../../types";

interface CardSubtitleProps
{
	contents?: CardProps["subtitle"];
	style?: CardProps["subtitleStyle"];
}

export default function CardSubtitle ({contents, style}: CardSubtitleProps)
{
	const css = useStyle ("card", style, undefined, "subtitleStyle");
	if (!contents)
		return null;

	return (
		<p css = {css}>
			{contents}
		</p>
	);
}