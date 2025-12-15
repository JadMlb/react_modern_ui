/** @jsxImportSource @emotion/react */

import { useMemo } from "react";
import { Style } from "../../../types";

interface BadgeWrapperProps
{
	style?: Style;
	children?: React.ReactNode;
}

const STYLE = {
	position: "relative",
	width: "fit-content",
	height: "fit-content",
} as const;

export default function BadgeWrapper ({style, children}: BadgeWrapperProps)
{
	const css = useMemo (
		() => ({
			...STYLE,
			...style
		}),
		[style]
	);
	return (
		<span css = {css}>
			{children}
		</span>
	);
}