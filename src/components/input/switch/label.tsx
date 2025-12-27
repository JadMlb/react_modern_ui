import React from "react";
import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

interface SwitchLabelProps
{
	hideLabel?: boolean;
	style?: Style;
	children?: React.ReactNode;
	onClick?: () => void;
}

export default function SwitchLabel ({hideLabel, style, children, onClick}: SwitchLabelProps)
{
	const css = useStyle ("switch", style, undefined, "labelStyle");

	if (hideLabel)
		return null;

	return (
		<label css = {css} onClick = {onClick}>
			{children}
		</label>
	);
}