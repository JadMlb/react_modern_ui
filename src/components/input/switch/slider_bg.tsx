import * as React from "react";
import { StaticStyle } from "../../../types";
import { merge } from "lodash";

interface SwitchSliderBackgroundProps
{
	children: React.ReactNode;
	value: boolean;
	style?: StaticStyle;
	activatedStyle?: StaticStyle;
	onClick?: () => void;
	onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
}

export default function SwitchSliderBackground ({value, style, activatedStyle, children, onClick, onContextMenu}: SwitchSliderBackgroundProps)
{
	const css = React.useMemo (
		() =>
		{
			if (value)
				return merge ({}, style, activatedStyle);
			return style;
		},
		[value, style, activatedStyle]
	);
	
	return (
		<div css = {css} onClick = {onClick} onContextMenu = {onContextMenu}>
			{children}
		</div>
	);
}