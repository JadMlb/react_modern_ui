import { ProgressBarProps, StaticStyle } from "../../../types";

interface ProgressBarContainerProps
{
	id?: ProgressBarProps["id"];
	className?: ProgressBarProps["className"];
	style?: StaticStyle;
	children?: React.ReactNode;
	as?: keyof HTMLElementTagNameMap;
}

export default function ProgressBarContainer ({as, id, className, style, children}: ProgressBarContainerProps)
{
	const Component = as ?? "label";

	return (
		<Component id = {id} className = {className} css = {style}>
			{children}
		</Component>
	);
}