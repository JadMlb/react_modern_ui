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
}

export type OverridableToasterProps = Pick<ToasterProps, "autoClear" | "clearAfter">;