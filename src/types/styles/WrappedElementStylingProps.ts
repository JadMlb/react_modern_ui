import { Style } from "../styles";
import StylingProps from "./StylingProps";

export default interface WrappedElementStylingProps<T = any> extends StylingProps<T>
{
	/**
	 * Styles the component wrapping the children
	 */
	parentStyle?: Style<T>;
}