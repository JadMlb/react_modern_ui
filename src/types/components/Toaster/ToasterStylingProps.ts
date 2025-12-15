import { Style } from "../../styles";
import { ToastIconMap } from "./Toast";

export default interface ToasterStylingProps
{
	/**
	 * The corner from which the toats are to appear. Any bottom corner will reverse the order of the toasts.
	 */
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	/**
	 * Styles the toasts container
	 */
	containerStyle?: Style;
	/**
	 * Styles the toasts
	 */
	toastStyle?: Style;
	/**
	 * Sets the toasts clear button
	 */
	clearButton?: React.ReactNode;
	/**
	 * Styles the toasts clear button
	 */
	clearButtonStyle?: Style;
	/**
	 * Sets the toasts progress bar if shown
	 */
	progressBar?: React.ReactNode;
	/**
	 * Styles the toasts progress bar if shown
	 */
	progressBarStyle?: Style;
	/**
	 * Sets the toasts icons by toast type
	 */
	icons?: Partial<ToastIconMap>;
}