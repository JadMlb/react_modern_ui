import { useMemo } from "react";
import { Style, radius, spacing, useDarkMode, useThemeParser } from "../../../styles";

interface ToastBackgroundProps
{
	style?: Style;
	children?: React.ReactNode;
}

const BG_STYLE = {
	padding: spacing.xsmall,
	borderRadius: radius.small,
	boxShadow: "gray 0px 1px 3px 0px",
	opacity: 0.99,
	position: "relative",
	overflow: "hidden",
	display: "grid",
	gridTemplateColumns: "30px 1fr 30px",
	gap: spacing.small,
	alignItems: "center",
} satisfies Style;

export default function ToastBackground ({style, children}: ToastBackgroundProps)
{
	const isDark = useDarkMode();
	const parseCss = useThemeParser();
	const realStyle = useMemo (
		() => parseCss ({
			...BG_STYLE,
			backgroundColor: isDark ? "black" : "white",
			...style
		}),
		[isDark, style]
	);
	
	return (
		<div css = {realStyle}>
			{children}
		</div>
	);
}