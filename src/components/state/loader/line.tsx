import { useMemo } from "react";
import { Style, useDarkMode, useThemeParser } from "../../../styles";
import { GenericProps } from "../../../types/components/GenericProps";

export default function TextLineLoader ({id, className, style}: GenericProps)
{
	const width = useMemo (
		() => Math.random(),
		[]
	);

	const isDark = useDarkMode();
	const parseCss = useThemeParser();
	const css = useMemo (
		() =>
		{
			const DEFAULT_STYLE = {
				height: 20,
				width: `${width * 100}%`,
				borderRadius: "radius.small",
				backgroundColor: isDark ? "grayDark" : "grayLight"
			} satisfies Style;

			return parseCss ({...DEFAULT_STYLE, ...style})
		},
		[parseCss, width, isDark]
	);

	return (
		<div css = {css} className = {className} id = {id}/>
	);
}