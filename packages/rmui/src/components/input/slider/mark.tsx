import { useMemo } from "react";
import { useDarkMode, useThemeParser } from "../../../styles";

interface MarkProps
{
	invisible?: boolean;
}

export default function Mark ({invisible}: MarkProps)
{
	const isDark = useDarkMode();
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			borderLeft: invisible ? "none" : `1px solid ${isDark ? "white" : "black"}`
		}),
		[invisible, isDark]
	);
	
	return (
		<div css = {css}/>
	);
}