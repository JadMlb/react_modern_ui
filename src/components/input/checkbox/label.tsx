import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

function ignoreClick (e: React.MouseEvent)
{
	e.stopPropagation();
}

interface CheckboxLabelProps
{
	label?: string;
	hideLabel?: boolean;
	style?: Style;
	id?: string;
	className?: string;
	children?: React.ReactNode;
	onContextMenu?: React.MouseEventHandler;
}

export default function CheckboxLabel ({id, className, label, hideLabel, style, onContextMenu, children}: CheckboxLabelProps)
{
	const css = useStyle ("checkbox", style, undefined, "labelStyle");
	
	return (
		<label
			id = {id}
			className = {className}
			css = {css}
			onClick = {ignoreClick}
			onContextMenu = {onContextMenu}
		>
			{children}
			{!hideLabel && label}
		</label>
	);
}