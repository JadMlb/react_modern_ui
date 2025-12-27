import React, { useCallback } from "react";
import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

interface SwitchSliderBackgroundProps
{
	children: React.ReactNode;
	value: boolean;
	style?: Style;
	activatedStyle?: Style;
	disabled?: boolean;
	onClick?: () => void;
	onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
}

export default function SwitchSliderBackground ({value, style, activatedStyle, children, disabled, onClick, onContextMenu}: SwitchSliderBackgroundProps)
{
	const injectedActivatedStyle = useCallback (
		(isDark: boolean) => ({
			backgroundColor: !disabled ? `affirmative${isDark ? "Dark" : ""}` : "transparent",
			borderColor: disabled ? `gray${isDark ? "Dark" : "Light"}` : `affirmative${isDark ? "" : "Elevated"}`
		}),
		[disabled]
	);
	const activatedCss = useStyle ("switch", activatedStyle, injectedActivatedStyle, "activatedStyle");
	const injectedStyles = useCallback (
		(isDark: boolean) =>
		{
			let additionalStyles = {};

			if (value)
				additionalStyles = activatedCss;
			return {
				borderColor: disabled ? `gray${isDark ? "Dark" : "Light"}` : "gray",
				...additionalStyles
			};
		},
		[value, disabled, activatedCss]
	);
	const css = useStyle ("switch", style, injectedStyles);
	
	return (
		<div css = {css} onClick = {onClick} onContextMenu = {onContextMenu}>
			{children}
		</div>
	);
}