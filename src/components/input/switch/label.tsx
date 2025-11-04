import React, { useMemo } from "react";
import { Style, useThemeParser } from "../../../styles";

interface SwitchLabelProps
{
	hideLabel?: boolean;
	style?: Style;
	children?: React.ReactNode;
	onClick?: () => void;
}

export default function SwitchLabel ({hideLabel, style, children, onClick}: SwitchLabelProps)
{
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({...style}),
		[style, parseCss]
	);

	if (hideLabel)
		return null;

	return (
		<label css = {css} onClick = {onClick}>
			{children}
		</label>
	);
}