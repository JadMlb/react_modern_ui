import { StaticStyle } from "../../../types";

interface ToasterContainerProps
{
	id?: string;
	className?: string;
	children?: React.ReactNode;
	style?: StaticStyle;
}

export default function ToasterContainer ({id, className, style, children}: ToasterContainerProps)
{
	return (
		<div id = {id} className = {className} css = {style}>
			{children}
		</div>
	);
}