import { useMemo } from "react";
import { useDarkMode } from "../../mode";
import { useThemeParser } from "../../theme";

export default function Arrow ({up}: {up?: boolean})
{
	const isDark = useDarkMode();
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			width: "7px",
			height: "7px",
			borderBottom: `2px solid ${isDark ? "white" : "black"}`,
			borderRight: `2px solid ${isDark ? "white" : "black"}`,
			transform: `translate(-spacing.small, ${up ? "" : "-"}1.75px) rotate(${up ? -13 : 4}5deg)`
		}),
		[parseCss, up]
	);
	
	return (
		<div css = {css}/>
	);
}