import { useMemo } from "react";
import { StaticStyle } from "../../../types";
import BaseProps from "../../../types/components/BaseProps";

interface ProgressBarBarProps extends BaseProps
{
	percentage: number;
	backgroundStyle?: StaticStyle;
	style?: StaticStyle;
}

export default function ProgressBarBar ({percentage, backgroundStyle, style, ...aria}: ProgressBarBarProps)
{
	const css = useMemo (
		() => ({
			"-webkit-appearance": "none",
			"-moz-appearance": "none",
			appearance: "none",
			...backgroundStyle,
			"::-webkit-progress-bar": backgroundStyle,
			"::-webkit-progress-value": style,
			"::-moz-progress-bar": style
		} satisfies StaticStyle),
		[backgroundStyle, style]
	);
	return (
		<progress css = {css} max = {100} value = {percentage} {...aria}/>
	);
}