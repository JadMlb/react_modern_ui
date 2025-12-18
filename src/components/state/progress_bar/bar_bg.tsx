import { useMemo } from "react";
import useStyle from "../../../hooks/useStyle";
import { ProgressBarProps } from "../../../types";

interface ProgressBarBackgroundProps
{
	thin?: ProgressBarProps["thin"];
	style?: ProgressBarProps["backgroundStyle"];
	children?: React.ReactNode;
}

export default function ProgressBarBackground ({thin, style, children}: ProgressBarBackgroundProps)
{
	const injectedStyles = useMemo (
		() => ({
			height: thin ? 3 : 10
		}),
		[thin]
	);
	const css = useStyle ("progressBar", style, injectedStyles, "backgroundStyle");

	return (
		<div css = {css}>
			{children}
		</div>
	);
}