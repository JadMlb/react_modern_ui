/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { Option } from "../../../../types";
import { useDarkMode, useThemeParser } from "../../../../styles";

interface ComboboxOptionProps
{
	option: Option;
	selected?: boolean;
	onClick: (option: Option) => void;
}

export default function ComboboxOption ({option, selected, onClick}: ComboboxOptionProps)
{
	const isDark = useDarkMode();
	
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
					cursor: "pointer",
					paddingInline: "spacing.xsmall",
					borderRadius: "calc(radius.small - spacing.xsmall)",
					backgroundColor: selected ? "primary" : "transparent",
					color: selected || isDark ? "white" : "black",
					":hover": {
						backgroundColor: `primary${isDark ? "Dark" : "Elevated"}`,
						color: isDark ? "white" : "black"
					}
				}),
		[parseCss, isDark, selected]
	);
	
	return (
		<div onClick = {() => onClick (option)} css = {css}>
			{option.display}
		</div>
	);
}