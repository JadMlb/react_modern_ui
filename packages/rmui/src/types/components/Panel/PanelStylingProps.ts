import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export default interface GenericPanelStylingProps<T> extends StylingProps<T>
{
	/**
	 * Styles the header of the panel
	 */
	headerStyle?: Style<T>;
	/**
	 * Styles the button responsible of toggling the visibility of the panel's contents
	 */
	toggleCollapseButtonStyle?: Style<T>;
}