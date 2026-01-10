import { useMemo } from "react";
import { StaticStyle, ToastIconType } from "../../../types";
import { useDarkMode } from "../../../styles";
import { merge } from "lodash";

interface DefaultToastIconProps
{
	icon?: Partial<ToastIconType>;
	style?: StaticStyle;
}

export default function ToastIcon ({style, icon}: DefaultToastIconProps)
{
	const isDark = useDarkMode();
	const css = useMemo (
		() => merge ({}, style, {backgroundColor: `${icon!.colour}${isDark ? "Dark" : ""}`}),
		[isDark, icon?.colour, style]
	);

	return (
		<div css = {css}>
			{icon?.icon}
		</div>
	);
}