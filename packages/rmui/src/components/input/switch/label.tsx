import React from "react";
import { StaticStyle } from "../../../types";

interface SwitchLabelProps
{
	hideLabel?: boolean;
	style?: StaticStyle;
	children?: React.ReactNode;
	onClick?: () => void;
}

export default function SwitchLabel ({hideLabel, style, children, onClick}: SwitchLabelProps)
{
	if (hideLabel)
		return null;

	return (
		<label css = {style} onClick = {onClick}>
			{children}
		</label>
	);
}