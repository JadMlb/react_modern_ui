import useProps from "../../../hooks/useProps";
import { CardProps } from "../../../types";
import CardContainer from "./card_container";
import CardContents from "./card_contents";
import CardMedia from "./card_media";
import CardSubtitle from "./card_subtitle";
import CardTitle from "./card_title";

/**
 * Renders a visible, elevated wrapper around the content with a title and a subtitle
 */
export default function Card (props: CardProps)
{
	const {
		level,
		title,
		titleStyle,
		subtitle,
		subtitleStyle,
		media,
		mediaPosition,
		children,
		...rest
	} = useProps ("card", props);
	
	return (
		<CardContainer
			title = {title}
			subtitle = {subtitle}
			media = {media}
			mediaPosition = {mediaPosition}
			{...rest}
		>
			<CardTitle contents = {title} style = {titleStyle} level = {level}/>
			<CardSubtitle contents = {subtitle} style = {subtitleStyle}/>
			<CardContents>{children}</CardContents>
			<CardMedia>{media}</CardMedia>
		</CardContainer>
	);
}