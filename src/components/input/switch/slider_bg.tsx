import React, { useMemo } from "react";
import { Style, useDarkMode, useThemeParser } from "../../../styles";
import { DEFAULT_ACTIVATED_SWITCH_BACKGROUND_STYLE, DEFAULT_SWITCH_BACKGROUND_STYLE } from "../../../types/components/Switch/SwitchStyle";

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
	const parseCss = useThemeParser();
	const isDark = useDarkMode();

	const css = useMemo (
		() =>
		{
			let styleObject: Style = {
				...DEFAULT_SWITCH_BACKGROUND_STYLE (isDark, disabled),
				...style
			};

			if (value)
				styleObject = {
					...styleObject,
					...DEFAULT_ACTIVATED_SWITCH_BACKGROUND_STYLE (isDark, disabled),
					...activatedStyle
				};
				
			return parseCss (styleObject);
		},
		[parseCss, value, isDark, style, disabled, activatedStyle]
	);
	
	return (
		<div css = {css} onClick = {onClick} onContextMenu = {onContextMenu}>
			{children}
		</div>
	);
}