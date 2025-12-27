import { useCallback } from "react";
import { Style, ToastIconType } from "../../../types";
import useStyle from "../../../hooks/useStyle";

interface DefaultToastIconProps
{
	icon?: Partial<ToastIconType>;
	style?: Style;
}

export default function ToastIcon ({style, icon}: DefaultToastIconProps)
{
	const injectedStyle = useCallback (
		(isDark: boolean) => ({
			backgroundColor: `${icon!.colour}${isDark ? "Dark" : ""}`
		}),
		[icon?.colour]
	);

	const css = useStyle ("toaster", style, injectedStyle, "iconContainerStyle");
	
	return (
		<div css = {css}>
			{icon?.icon}
		</div>
	);
}