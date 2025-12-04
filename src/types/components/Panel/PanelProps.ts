import React from "react";
import { GenericProps } from "../GenericProps";
import DivProps from "../DivProps";

export interface PanelProps extends GenericProps, DivProps
{
	/**
	 * Displays a title to the panel and enables a border around it
	 */
	title?: React.ReactNode;
	/**
	 * Specifies whether the panel can be collapsed or not
	 */
	collapsible?: boolean;
	/**
	 * The content of the panel
	 */
	children: React.ReactNode;
}