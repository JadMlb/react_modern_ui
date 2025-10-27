import { useMemo } from "react";
import { Style, useDarkMode, useThemeParser } from "../../../styles";
import { TOAST_TYPE_SYMBOL_MAP, ToastIconType, ToastType } from "../../../types";

const BG_STYLE = {
	width: 30,
	height: 30,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "radius.round",
	color: "white",
	fontWeight: "bold"
} satisfies Style;

interface DefaultToastIconProps
{
	icon?: ToastIconType;
	type: ToastType;
}

export default function ToastIcon ({type, icon}: DefaultToastIconProps)
{
	const parseCss = useThemeParser();
	const isDark = useDarkMode();
	const realMap = useMemo (
		() => ({
			...TOAST_TYPE_SYMBOL_MAP,
			[type]: icon ? icon : TOAST_TYPE_SYMBOL_MAP[type]
		}),
		[icon]
	);

	const realStyle = useMemo (
		() => parseCss ({
			...BG_STYLE,
			backgroundColor: `${realMap[type].colour}${isDark ? "Dark" : ""}`
		}),
		[parseCss, type, isDark, realMap]
	);
	
	return (
		<div css = {realStyle}>
			{realMap[type].icon}
		</div>
	);
}