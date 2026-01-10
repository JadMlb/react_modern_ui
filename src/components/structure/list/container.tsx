import { StaticStyle } from "../../../types";

interface ListContainerProps
{
	id?: string;
	className?: string;
	style?: StaticStyle;
	children: React.ReactNode;
}

export function ListContainer ({id, className, style, children}: ListContainerProps)
{
	return (
		<ul
			id = {id}
			className = {className}
			css = {style}
		>
			{children}
		</ul>
	);
}