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
}

export default function CheckboxLabel ({id, className, label, hideLabel, style, onContextMenu, children}: CheckboxLabelProps)
{
	return (
		<label
			id = {id}
			className = {className}
			css = {style}
			onClick = {ignoreClick}
			onContextMenu = {onContextMenu}
		>
			{children}
			{!hideLabel && label}
		</label>
	);
}