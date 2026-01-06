import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export default interface PopupStylingProps extends StylingProps
{
	headerStyle?: Style;
	footerStyle?: Style;
	backdropStyle?: Style;
}