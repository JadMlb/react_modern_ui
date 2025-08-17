import { Style } from "../../../styles";
import { ToastIconMap } from "./Toast";

export default interface ToasterProps
{
	/**
	 * The corner from which the toats are to appear. Any bottom corner will reverse the order of the toasts.
	 */
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	/**
	 * Determines if the toast is automatically cleared after the value of `clearAfter`, or if it sticks until the close button in clicked. Defaults to `false`.
	 */
	autoClear?: boolean;
	/**
	 * The number of seconds after which the toast will automatically diappear if `autoClear` is enabled. Defaults to 5 seconds.
	 */
	clearAfter?: number;
	/**
	 * Styles the toasts container
	 */
	containerStyle?: Style;
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