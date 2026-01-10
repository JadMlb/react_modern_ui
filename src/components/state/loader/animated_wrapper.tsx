import { StaticStyle } from "../../../types";

interface AnimatedLoaderWrapperProps
{
	className?: string;
	id?: string;
	style?: StaticStyle;
	children?: React.ReactNode;
}

export default function AnimatedLoaderWrapper ({id, className, style, children}: AnimatedLoaderWrapperProps)
{
	return (
		<div css = {style} className = {className} id = {id}>
			{children}
		</div>
	);
}