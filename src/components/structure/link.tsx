import { useMemo } from "react";
import { useDarkMode, useThemeParser } from "../../styles";
import { DEFAULT_BUTTON_STYLES } from "../../types/components/Button/ButtonStyle";
import { LinkProps } from "../../types/components/Link/LinkProps";

const DEFAULT_TYPE_STYLE = DEFAULT_BUTTON_STYLES["link"]!;

export default function Link ({id, autoFocus, children, style, className, to, onClick, onBlur, onFocus, onKeyDown, onKeyUp, onMouseEnter, onMouseLeave}: LinkProps)
{
	const isDark = useDarkMode();
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			...DEFAULT_TYPE_STYLE ("normal", isDark ? "dark" : "light"),
			...style
		}),
		[isDark, parseCss, style]
	);
	
	return (
		<a
			href = {to}
			autoFocus = {autoFocus}
			css = {css}
			className = {className}
			id = {id}
			onClick = {onClick}
			onBlur = {onBlur}
			onFocus = {onFocus}
			onKeyDown = {onKeyDown}
			onKeyUp = {onKeyUp}
			onMouseEnter = {onMouseEnter}
			onMouseLeave = {onMouseLeave}
		>
			{children}
		</a>
	);
}