import { StaticStyle } from "../../../types";

interface SwitchWrapperProps
{
	id?: string;
	className?: string;
	style?: StaticStyle;
	children: React.ReactNode;
	as?: keyof HTMLElementTagNameMap;
}

export default function SwitchWrapper ({as, id, className, style, children}: SwitchWrapperProps)
{
	const Component = as ?? "div"
	return (
		<Component css = {style} id = {id} className = {className}>
			{children}
		</Component>
	);
}