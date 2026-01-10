import { useMemo } from "react";
import { StaticStyle } from "../../../types";
import { merge } from "lodash";

interface SwitchHandleProps
{
	style?: StaticStyle;
	activatedStyle?: StaticStyle;
	value: boolean;
}

export default function SwitchHandle ({value, style, activatedStyle}: SwitchHandleProps)
{
	const css = useMemo (
		() =>
		{
			if (value)
				return merge ({}, style, activatedStyle);
			return style;
		},
		[value, style, activatedStyle]
	);
	
	return (
		<div css = {css}/>
	);
}