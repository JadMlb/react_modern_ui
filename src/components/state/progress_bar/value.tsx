import { StaticStyle } from "../../../types";

interface ProgressBarValueProps
{
	style?: StaticStyle;
}

export default function ProgressBarValue ({style}: ProgressBarValueProps)
{
	return (
		<div css = {style}/>
	);
}