import { Style } from "../styles";
import StylingProps from "./StylingProps";

export default interface WrappedElementStylingProps extends StylingProps
{
	/**
	 * Styles the component wrapping the children
	 */
	parentStyle?: Style;
}