import useStyle from "../../../hooks/useStyle";
import { ProgressBarProps } from "../../../types";

interface ProgressBarContainerProps
{
	id?: ProgressBarProps["id"];
	className?: ProgressBarProps["className"];
	style?: ProgressBarProps["parentStyle"];
	children?: React.ReactNode;
}

export default function ProgressBarContainer ({id, className, style, children}: ProgressBarContainerProps)
{
	const css = useStyle ("progressBar", style, undefined, "parentStyle");

	return (
		<div id = {id} className = {className} css = {css}>
			{children}
		</div>
	);
}