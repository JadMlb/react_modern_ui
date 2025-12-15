import StylingProps from "../../styles/StylingProps";
import DivProps from "../DivProps";

export interface CardProps extends StylingProps, DivProps
{
	/**
	 * The title of the card shown in bold
	 */
	title?: string;
	/**
	 * The subtitle of the card, displayed in a gray & smaller font size
	 */
	subtitle?: string;
	/**
	 * The component to be displayed in the card.
	 */
	media?: React.ReactNode;
	/**
	 * Defines the position of the media element
	 */
	mediaPosition?: "left" | "top" | "right" | "bottom",
	/**
	 * The content of the card's body
	 */
	children?: React.ReactNode;
}

export type OverridableCardProps = never;