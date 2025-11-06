import { useMemo } from "react";
import { Style, useDarkMode, useThemeParser } from "../../../styles";
import { Option } from "../../../types";

interface MarkProps
{
	data: Option;
	noTick?: boolean;
}

const DEFAULT_STYLE = {
	textAlign: "center",
	position: "relative",
	"&:before": {
		content: '""',
		position: "absolute",
		width: 1,
		height: 4,
		left: `calc(50% - 0.5px)`,
		top: -4
	}
} satisfies Style;

export default function Mark ({data, noTick}: MarkProps)
{
	const parseCss = useThemeParser();
	const isDark = useDarkMode();

	const css = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			color: isDark ? "white" : "black",
			width: 20,
			"&:before": {
				...DEFAULT_STYLE["&:before"],
				backgroundColor: isDark ? "white" : "black",
				display: noTick ? "none" : "block"
			}
		}),
		[parseCss, isDark, noTick]
	);
	
	return (
		<div css = {css}>{data.display}</div>
	);
}