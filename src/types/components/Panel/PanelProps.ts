import React from "react";
import DivProps from "../DivProps";
import StylingProps from "../../styles/StylingProps";

export interface PanelProps extends StylingProps, DivProps
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

export type OverridablePanelProps = Pick<PanelProps, "collapsible">