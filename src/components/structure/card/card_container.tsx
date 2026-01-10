import { CardProps, StaticStyle } from "../../../types";

type CardContainerProps = Omit<CardProps, "level" | "titleStyle" | "subtitleStyle" | "style"> & {css: StaticStyle};

export default function CardContainer ({children, ...rest}: CardContainerProps)
{	
	return (
		<div {...rest}>
			{children}
		</div>
	);
}