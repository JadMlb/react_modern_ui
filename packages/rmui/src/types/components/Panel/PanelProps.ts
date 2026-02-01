import React from "react";
import DivProps from "../DivProps";
import GenericPanelStylingProps from "./PanelStylingProps";
import { Props } from "../Props";

export interface PanelConfigProps extends DivProps
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
	 * Styles the colour of the panel's toggle button's chevron
	 */
	toggleCollapseButtonChevronColour?: string;
	/**
	 * The content of the panel
	 */
	children: React.ReactNode;
}

export type PanelStylingProps = GenericPanelStylingProps<PanelConfigProps>;
export type PanelProps = Props<PanelConfigProps, PanelStylingProps>;

export type OverridablePanelProps = Pick<PanelProps, "collapsible" | "toggleCollapseButtonChevronColour">