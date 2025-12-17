import React from "react";
import DivProps from "../DivProps";
import PanelStylingProps from "./PanelStylingProps";

export interface PanelProps extends PanelStylingProps, DivProps
{
	/**
	 * Displays a title to the panel and enables a border around the panel
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