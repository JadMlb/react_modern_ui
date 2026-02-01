import { useMemo } from "react";
import { useDarkMode, useThemeParser } from "../../../styles";
import { Option, Style } from "../../../types";

interface LabelProps
{
	data: Option;
}

const DEFAULT_STYLE = {
	textAlign: "center"
} satisfies Style;

export default function Label ({data}: LabelProps)
{
	const parseCss = useThemeParser();
	const isDark = useDarkMode();

	const css = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			color: isDark ? "white" : "black",
		}),
		[parseCss, isDark]
	);
	
	return (
		<div css = {css}>{data.display}</div>
	);
}