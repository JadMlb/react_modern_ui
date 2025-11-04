import { useMemo } from "react";
import { Style, useThemeParser } from "../../../styles";

const DEFAULT_SWITCH_WRAPPER_PROPS: Style = {
	display: "flex",
	gap: "spacing.medium",
	alignItems: "center",
	width: "fit-content"
};

interface SwitchWrapperProps
{
	id?: string;
	className?: string;
	style?: Style;
	children: React.ReactNode;
}

export default function SwitchWrapper ({style, children}: SwitchWrapperProps)
{
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			...DEFAULT_SWITCH_WRAPPER_PROPS,
			...style
		}),
		[parseCss, style]
	);

	return (
		<div css = {css}>
			{children}
		</div>
	);
}