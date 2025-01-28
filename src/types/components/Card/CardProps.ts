import { GenericProps } from "../GenericProps";
import { ActionElementStyle } from "../styles/actionElement/ActionElementStyle";

export interface CardProps extends GenericProps
{
	style?: ActionElementStyle
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
	/**
	 * Event handler fired when the card is clicked
	 */
	onClick?: React.MouseEventHandler;
}