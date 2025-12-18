import { useMemo } from "react";
import { ProgressBarProps } from "../../../types";
import useStyle from "../../../hooks/useStyle";

interface ProgressBarValueProps
{
	value: ProgressBarProps["percentage"];
	style?: ProgressBarProps["style"];
}

export default function ProgressBarValue ({value, style}: ProgressBarValueProps)
{
	const injectedStyles = useMemo (
		() => ({
			width: `${value}%`
		}),
		[value]
	);
	const css = useStyle ("progressBar", style, injectedStyles);
	
	return (
		<div css = {css}/>
	);
}