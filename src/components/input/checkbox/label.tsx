import { useMemo } from "react";
import { Style, useThemeParser } from "../../../styles";

const DEFAULT_STYLE = {
	display: "flex",
	alignItems: "center"
} satisfies Style;

function ignoreClick (e: React.MouseEvent)
{
	e.stopPropagation();
}

interface CheckboxLabelProps
{
	label?: string;
	hideLabel?: boolean;
	style?: Style;
	id?: string;
	className?: string;
	children?: React.ReactNode;
}

export default function CheckboxLabel ({id, className, label, hideLabel, style, children}: CheckboxLabelProps)
{
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			gap: "spacing.xsmall",
			...style
		} satisfies Style),
		[style, parseCss]
	);
	
	return (
		<label
			id = {id}
			className = {className}
			css = {css}
			onClick = {ignoreClick}
		>
			{children}
			{!hideLabel && label}
		</label>
	);
}