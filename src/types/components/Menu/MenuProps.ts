import React from "react";
import { Position } from "../../Position";
import StylingProps from "../../styles/StylingProps";

export default interface MenuProps extends StylingProps
{
	/**
	 * A ref to the html parent element of the menu
	 */
	anchorElement: HTMLElement | null;
	/**
	 * Determines if the menu is visible or not
	 */
	open: boolean;
	/**
	 * The source position on the anchor from which the menu would appear
	 */
	position?: Partial<Position>;
	/**
	 * The direction of the menu relative to the anchor
	 */
	direction?: Partial<Position>;
	/**
	 * The contents of the menu
	 */
	children?: React.ReactNode;
	/**
	 * Callback function when closing the menu, triggered when clicking outside of the menu
	 */
	onClose?: () => void;
}

export type OverridableMenuProps = Pick<MenuProps, "position" | "direction">;