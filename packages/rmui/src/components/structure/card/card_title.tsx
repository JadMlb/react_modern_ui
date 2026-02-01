import { CardProps, StaticStyle } from "../../../types";

interface CardTitleProps
{
	level?: CardProps["level"];
	contents?: CardProps["title"];
	style?: StaticStyle;
}

export default function CardTitle ({contents, level = 4, style}: CardTitleProps)
{
	if (!contents)
		return null;

	const Component = `h${level}` as const;
	return (
		<Component css = {style}>
			{contents}
		</Component>
	);
}