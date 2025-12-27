import { Style } from "../../styles";

export default interface ToasterStylingProps
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