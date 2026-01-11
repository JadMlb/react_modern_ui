import { useCallback, useMemo } from "react";
import { Colour, COLOURS_ALT_NAMES, StaticStyle, ToastIconType } from "../../../types";
import { useDarkMode, useThemeColours } from "../../../styles";
import { merge } from "lodash";

interface DefaultToastIconProps
{
	icon?: Partial<ToastIconType>;
	style?: StaticStyle;
}

function useColour ()
{
	const getThemeColour = useThemeColours();

	return useCallback (
		(colour: string) =>
		{
			if (colour in COLOURS_ALT_NAMES)
				return getThemeColour (colour as Colour);
			return colour;
		},
		[getThemeColour]
	);
}

export default function ToastIcon ({style, icon}: DefaultToastIconProps)
{
	const isDark = useDarkMode();
	const getColour = useColour();
	const css = useMemo (
		() => merge ({}, style, {backgroundColor: getColour (`${icon!.colour}${isDark ? "Dark" : ""}`)}),
		[isDark, getColour, icon?.colour, style]
	);

	console.log (style, css);

	return (
		<div css = {css}>
			{icon?.icon}
		</div>
	);
}