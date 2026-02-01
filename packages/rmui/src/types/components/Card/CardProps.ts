import DivProps from "../DivProps";
import { Props } from "../Props";
import GenericCardStylingProps from "./CardStylingProps";

export interface CardConfigProps extends DivProps
{
	/**
	 * The title of the card shown in bold
	 */
	title?: string;
	/**
	 * Sets the type of the card title component, from h1 to h6, for better semantics.
	 * @default 4
	 */
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	/**
	 * The subtitle of the card
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

export type CardStylingProps = GenericCardStylingProps<CardConfigProps>;
export type CardProps = Props<CardConfigProps, CardStylingProps>;

export type OverridableCardProps = Pick<CardProps, "mediaPosition" | "level">;