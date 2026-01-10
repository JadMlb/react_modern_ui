import { ProgressBarProps, StaticStyle } from "../../../types";

interface ProgressBarContainerProps
{
	id?: ProgressBarProps["id"];
	className?: ProgressBarProps["className"];
	style?: StaticStyle;
	children?: React.ReactNode;
}

export default function ProgressBarContainer ({id, className, style, children}: ProgressBarContainerProps)
{
	return (
		<div id = {id} className = {className} css = {style}>
			{children}
		</div>
	);
}