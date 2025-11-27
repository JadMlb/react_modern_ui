import { GenericProps } from "../GenericProps";

export interface LinkProps extends GenericProps
{
	/**
	 * The destination where the link should navigate to
	 */
	to?: string;
	/**
	 * Automatically focuses on the link on mount
	 */
	autoFocus?: boolean;
	children?: React.ReactNode;
	/**
	 * Callback function to be executed on link click
	 */
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
	onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
	onBlur?: React.FocusEventHandler<HTMLAnchorElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement>;
	onKeyUp?: React.KeyboardEventHandler<HTMLAnchorElement>;
}