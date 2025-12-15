import React from "react";
import MenuStylingProps from "./MenuStylingProps";

export default interface MenuProps extends MenuStylingProps
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
	 * The contents of the menu
	 */
	children?: React.ReactNode;
	/**
	 * Callback function when closing the menu, triggered when clicking outside of the menu
	 */
	onClose?: () => void;
}

export type OverridableMenuProps = never;