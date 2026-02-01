import { Style } from "../../../types";
import BaseProps from "../../../types/components/BaseProps";

interface TableContainerProps extends BaseProps
{
	onContextMenu?: React.MouseEventHandler;
	children?: React.ReactNode;
}

const STYLE = {
	display: "flex",
	flexDirection: "column"
} satisfies Style;

export default function TableContainer ({onContextMenu, children, ...rest}: TableContainerProps)
{
	return (
		<div css = {STYLE} onContextMenu = {onContextMenu} {...rest}>
			{children}
		</div>
	);
}