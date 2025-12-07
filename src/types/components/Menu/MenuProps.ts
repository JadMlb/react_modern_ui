import React from "react";
import { GenericProps } from "../GenericProps";
import { Position } from "../../Position";

export default interface MenuProps extends GenericProps
{
	/**
	 * A ref to the html parent element of the menu
	 */
	anchorElement: HTMLElement | null;
	/**
	 * The source position on the anchor from which the menu would appear
	 */
	position?: Partial<Position>;
	/**
	 * The direction of the menu relative to the anchor
	 */
	direction?: Partial<Position>;
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