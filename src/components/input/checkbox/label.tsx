import { StaticStyle } from "../../../types";

function ignoreClick (e: React.MouseEvent)
{
	e.stopPropagation();
}

interface CheckboxLabelProps
{
	label?: string;
	hideLabel?: boolean;
	style?: StaticStyle;
	id?: string;
	className?: string;
	children?: React.ReactNode;
	onContextMenu?: React.MouseEventHandler;
	as?: keyof HTMLElementTagNameMap;
}

export default function CheckboxLabel ({id, className, label, hideLabel, style, onContextMenu, children, as}: CheckboxLabelProps)
{
	const Component = as ?? "label";
	
	return (
		<Component
			id = {id}
			className = {className}
			css = {style}
			onClick = {ignoreClick}
			onContextMenu = {onContextMenu}
		>
			{children}
			{!hideLabel && label}
		</Component>
	);
}