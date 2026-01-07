import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export default interface ToasterStylingProps extends Omit<StylingProps, "style">
{
	/**
	 * Styles the toasts container
	 */
	containerStyle?: Style;
	/**
	 * Styles the toasts
	 */
	toastStyle?: Style;
	/**
	 * Styles the toasts clear button
	 */
	clearButtonStyle?: Style;
	/**
	 * Styles the toasts progress bar if shown
	 */
	progressBarStyle?: Style;
	/**
	 * Styles the toast icon background
	 */
	iconContainerStyle?: Style;
}