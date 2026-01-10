import { StaticStyle } from "../../../types";

interface ProgressBarBackgroundProps
{
	style?: StaticStyle;
	children?: React.ReactNode;
}

export default function ProgressBarBackground ({style, children}: ProgressBarBackgroundProps)
{
	return (
		<div css = {style}>
			{children}
		</div>
	);
}