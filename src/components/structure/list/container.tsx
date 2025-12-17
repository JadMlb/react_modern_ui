import useStyle from "../../../hooks/useStyle";
import { Style } from "../../../types";

interface ListContainerProps
{
	id?: string;
	className?: string;
	style?: Style;
	children: React.ReactNode;
}

export function ListContainer ({id, className, style, children}: ListContainerProps)
{
	const css = useStyle ("list", style, undefined);

	return (
		<ul
			id = {id}
			className = {className}
			css = {css}
		>
			{children}
		</ul>
	);
}