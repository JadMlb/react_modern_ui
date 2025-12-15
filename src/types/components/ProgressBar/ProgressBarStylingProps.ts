import { Style } from "../../styles";
import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";

export default interface ProgressBarStylingProps extends WrappedElementStylingProps
{
	/**
	 * Controls the style of the progress bar container, the parent of both the bar itself and the percentage
	 */
	parentStyle?: Style;
	/**
	 * Controls the style of the progress bar background
	 */
	backgroundStyle?: Style;
}