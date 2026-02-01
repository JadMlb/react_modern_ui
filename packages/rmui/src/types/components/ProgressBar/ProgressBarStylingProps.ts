import { Style } from "../../styles";
import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";

export default interface GenericProgressBarStylingProps<T> extends WrappedElementStylingProps<T>
{
	/**
	 * Controls the style of the progress bar container, the parent of both the bar itself and the percentage
	 */
	parentStyle?: Style<T>;
	/**
	 * Controls the style of the progress bar background
	 */
	backgroundStyle?: Style<T>;
}