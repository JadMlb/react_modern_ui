import StylingProps from "../../styles/StylingProps";
import { Props } from "../Props";

export type ButtonRoles = "primary" | "alert" | "warn" | "normal";
export type ButtonTypes = "filled" | "outlined" | "link";

export interface ButtonConfigProps
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
	 * The underlying html button's type
	 */
	htmlType?: "button" | "submit" | "reset";
	/**
	 * Specified if the button is disabled or not. Defaults to `false`.
	 */
	disabled?: boolean;
	/**
	 * Automatically focuses on the button on mount
	 */
	autoFocus?: boolean;
	name?: string;
	children?: React.ReactNode;
	onContextMenu?: React.MouseEventHandler<HTMLButtonElement>;
	/**
	 * Callback function to be executed on button click
	 */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
	onFocus?: React.FocusEventHandler<HTMLButtonElement>;
	onBlur?: React.FocusEventHandler<HTMLButtonElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
	onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>;
}

export type ButtonStylingProps = StylingProps<ButtonConfigProps>;
export type ButtonProps = Props<ButtonConfigProps, ButtonStylingProps>;

export type OverridableButtonProps = Pick<ButtonConfigProps, "role" | "htmlType">;