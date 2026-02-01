import { Style } from "../../styles";
import BasicCssStylingProps from "../../styles/BasicCssStylingProps";

export default interface GenericToasterStylingProps<T> extends BasicCssStylingProps
{
	/**
	 * Styles the toasts container
	 */
	containerStyle?: Style<T>;
	/**
	 * Styles the toasts
	 */
	toastStyle?: Style<T>;
	/**
	 * Styles the toasts clear button
	 */
	clearButtonStyle?: Style<T>;
	/**
	 * Styles the toasts progress bar if shown
	 */
	progressBarStyle?: Style<T>;
	/**
	 * Styles the toast icon background
	 */
	iconContainerStyle?: Style<T>;
}