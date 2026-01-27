import { CardProps, StaticStyle } from "../../../types";

type CardContainerProps = Omit<CardProps, "style" | "level" | "title" | "titleStyle" | "subtitle" | "subtitleStyle" | "media" | "mediaPosition"> & {css: StaticStyle};

export default function CardContainer ({children, as, ...rest}: CardContainerProps)
{
	const Component = as ?? "div";

	return (
		<Component {...rest}>
			{children}
		</Component>
	);
}