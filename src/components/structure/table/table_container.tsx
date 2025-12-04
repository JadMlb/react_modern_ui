import { Style } from "../../../styles";

interface TableContainerProps
{
	onContextMenu?: React.MouseEventHandler;
	children?: React.ReactNode;
}

const STYLE = {
	display: "flex",
	flexDirection: "column"
} satisfies Style;

export default function TableContainer ({onContextMenu, children}: TableContainerProps)
{
	return (
		<div css = {STYLE} onContextMenu = {onContextMenu}>
			{children}
		</div>
	);
}