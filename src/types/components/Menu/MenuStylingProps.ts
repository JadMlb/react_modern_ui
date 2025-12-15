import { Position } from "../../Position";
import StylingProps from "../../styles/StylingProps";

export default interface MenuStylingProps extends StylingProps
{
	/**
	 * The source position on the anchor from which the menu would appear
	 */
	position?: Partial<Position>;
	/**
	 * The direction of the menu relative to the anchor
	 */
	direction?: Partial<Position>;
}