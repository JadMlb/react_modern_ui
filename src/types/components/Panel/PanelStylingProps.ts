import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export default interface PanelStylingProps extends StylingProps
{
	/**
	 * Styles the header of the panel
	 */
	headerStyle?: Style;
	/**
	 * Styles the button responsible of toggling the visibility of the panel's contents
	 */
	toggleCollapseButtonStyle?: Style;
}