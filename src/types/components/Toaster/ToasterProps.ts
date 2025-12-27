import { PartialToastIconMap } from "./Toast";
import ToasterStylingProps from "./ToasterStylingProps";

export default interface ToasterProps extends ToasterStylingProps
{
	/**
	 * Determines if the toast is automatically cleared after the value of `clearAfter`, or if it sticks until the close button in clicked. Defaults to `false`.
	 */
	autoClear?: boolean;
	/**
	 * The number of seconds after which the toast will automatically diappear if `autoClear` is enabled. Defaults to 5 seconds.
	 */
	clearAfter?: number;
	/**
	 * The corner from which the toats are to appear. Any bottom corner will reverse the order of the toasts.
	 */
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	/**
	 * Sets the toasts clear button
	 */
	clearButton?: React.ReactNode;
	/**
	 * Sets the toasts progress bar if shown
	 */
	progressBar?: React.ReactNode;
	/**
	 * Sets the toasts icons by toast type
	 */
	icons?: PartialToastIconMap;
}

export type OverridableToasterProps = Pick<ToasterProps, "autoClear" | "clearAfter" | "position" | "clearButton" | "progressBar" | "icons">;