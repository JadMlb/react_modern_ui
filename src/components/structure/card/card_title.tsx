import useStyle from "../../../hooks/useStyle";
import { CardProps } from "../../../types";

interface CardTitleProps
{
	level?: CardProps["level"];
	contents?: CardProps["title"];
	style?: CardProps["titleStyle"];
}

export default function CardTitle ({contents, level = 4, style}: CardTitleProps)
{
	const css = useStyle ("card", style, undefined, "titleStyle");
	if (!contents)
		return null;

	const Component = `h${level}` as const;
	return (
		<Component css = {css}>
			{contents}
		</Component>
	);
}