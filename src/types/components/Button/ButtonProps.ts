import { GenericProps } from "../GenericProps";

export type ButtonRoles = "primary" | "alert" | "warn" | "normal";
export type ButtonTypes = "filled" | "outlined" | "link";

export interface ButtonProps extends GenericProps
{
	/**
	 * The role the button will take
	 * - `normal` (default): renders a button with gray background
	 * - `primary`: renders a button with primary colour in its background
	 * - `alert`: renders a gray button that turns red on hover
	 * - `warn`: renders a red button
	 */
	role?: ButtonRoles;
	/**
	 * The type of the button
	 * - `filled` (default): renders a button with the appropriate background colour
	 * - `outlined`: renders a button with a border and a transparent background
	 * - `link`: renders a button in the style of a hyperlink
	 */
	type?: ButtonTypes;
	/**
	 * Specified if the button is disabled or not. Defaults to `false`.
	 */
	disabled?: boolean;
	children: React.ReactNode;
	/**
	 * Callback function to be executed on button click
	 */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}