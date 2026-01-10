import { StaticStyle } from "../../../types";

interface FieldsetProps
{
	disabled?: boolean;
	style?: StaticStyle;
	children?: React.ReactNode;
	onContextMenu?: React.MouseEventHandler;
}

export default function Fieldset ({disabled, style, onContextMenu, children}: FieldsetProps)
{
	return (
		<fieldset css = {style} aria-disabled = {disabled} onContextMenu = {onContextMenu}>
			{children}
		</fieldset>
	);
}