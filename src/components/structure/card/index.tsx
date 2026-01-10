import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";
import { CardProps } from "../../../types";
import CardContainer from "./card_container";
import CardContents from "./card_contents";
import CardMedia from "./card_media";
import CardSubtitle from "./card_subtitle";
import CardTitle from "./card_title";

/**
 * Renders a visible, elevated wrapper around the content with a title and a subtitle
 */
export default function Card (instanceProps: CardProps)
{
	const props = useProps ("card", instanceProps);
	const {
		style,
		level,
		title,
		titleStyle,
		subtitle,
		subtitleStyle,
		media,
		mediaPosition,
		children,
		...rest
	} = props;

	const css = useStyle ("card", props, style);
	const titleCss = useStyle ("card", props, titleStyle, "titleStyle");
	const subtitleCss = useStyle ("card", props, subtitleStyle, "subtitleStyle");
	
	return (
		<CardContainer
			title = {title}
			subtitle = {subtitle}
			media = {media}
			mediaPosition = {mediaPosition}
			{...rest}
			css = {css}
		>
			<CardTitle contents = {title} style = {titleCss} level = {level}/>
			<CardSubtitle contents = {subtitle} style = {subtitleCss}/>
			<CardContents>{children}</CardContents>
			<CardMedia>{media}</CardMedia>
		</CardContainer>
	);
}