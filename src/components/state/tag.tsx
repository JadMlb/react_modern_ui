import { useEffect, useMemo, useState } from "react";
import { Style, useDarkMode, useThemeParser } from "../../styles";
import { TagProps } from "../../types/components/Tag/TagProps";
import DEFAULT_TAG_STYLE from "../../types/components/Tag/TagStyle";

export default function Tag ({id, className, colour = "neutral", style, onClick, children}: TagProps)
{
	const isDark = useDarkMode();

	const parseCss = useThemeParser();
	const [css, setCss] = useState<Style> ({});
	
	const bgCol = useMemo (
		() => 
		{
			switch (colour)
			{
				case "success": return "affirmative";
				case "warning": return "alert";
				case "error": return "error";
				case "neutral":
				default:
					return "gray" as const;
			}
		},
		[colour, isDark]
	);

	useEffect (
		() =>
		{
			setCss (
				parseCss ({
					...DEFAULT_TAG_STYLE (isDark, bgCol, !!onClick),
					...style
				})
			);
		},
		[style, parseCss, !!onClick]
	);
	
	return (
		<div
			css = {css}
			className = {className}
			id = {id}
			onClick = {onClick}
		>
			{children}
		</div>
	);
}