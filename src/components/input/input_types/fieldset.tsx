import { StaticStyle } from "../../../types";
import BaseProps from "../../../types/components/BaseProps";

interface FieldsetProps extends BaseProps
{
	disabled?: boolean;
	style?: StaticStyle;
	children?: React.ReactNode;
	onContextMenu?: React.MouseEventHandler;
}

export default function Fieldset ({disabled, style, onContextMenu, children, as, ...rest}: FieldsetProps)
{
	const Component = as ?? "fieldset";

	return (
		<Component css = {style} aria-disabled = {disabled} onContextMenu = {onContextMenu} {...rest}>
			{children}
		</Component>
	);
}