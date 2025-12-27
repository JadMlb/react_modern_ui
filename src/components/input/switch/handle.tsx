import { useCallback } from "react";
import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

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
	const activatedCss = useStyle ("switch", activatedStyle, undefined, "activatedHandleStyle");
	const injectedStyles = useCallback (
		(isDark: boolean) =>
		{
			let additionalStyles = {};

			if (value)
				additionalStyles = activatedCss;
			return {
				backgroundColor: readonly || disabled ? `gray${isDark ? "Dark" : "Light"}` : "white",
				...additionalStyles
			};
		},
		[value, readonly, disabled, activatedCss]
	);
	const css = useStyle ("switch", style, injectedStyles, "handleStyle");
	
	return (
		<div css = {css}/>
	);
}