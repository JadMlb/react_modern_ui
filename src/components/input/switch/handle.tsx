import { useMemo } from "react";
import { Style, useDarkMode, useThemeParser } from "../../../styles";
import { DEFAULT_ACTIVATED_SWITCH_HANDLE_STYLE, DEFAULT_SWITCH_HANDLE_STYLE } from "../../../types/components/Switch/SwitchStyle";

interface SwitchHandleProps
{
	style?: Style;
	activatedStyle?: Style;
	readonly?: boolean;
	disabled?: boolean;
	value: boolean;
}

export default function SwitchHandle ({value, readonly, disabled, style, activatedStyle}: SwitchHandleProps)
{
	const parseCss = useThemeParser();
	const isDark = useDarkMode();
	const css = useMemo (
		() => {
			let styleObject: Style = {
				...DEFAULT_SWITCH_HANDLE_STYLE (isDark, disabled),
				...style
			};

			if (value)
				styleObject = {
					...styleObject,
					...DEFAULT_ACTIVATED_SWITCH_HANDLE_STYLE,
					...activatedStyle
				};

			return parseCss (styleObject);
		},
		[parseCss, style, activatedStyle, value, readonly, disabled, isDark]
	);

	return (
		<div css = {css}/>
	);
}