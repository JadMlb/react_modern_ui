import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export default interface GenericPopupStylingProps<T> extends StylingProps<T>
{
	headerStyle?: Style<T>;
	footerStyle?: Style<T>;
	backdropStyle?: Style<T>;
}