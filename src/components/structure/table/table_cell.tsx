import { useMemo } from "react";
import TableCellProps from "./TableCellProps";
import useStyle from "../../../hooks/useStyle";

interface DataTableCellProps extends TableCellProps
{
	children?: React.ReactNode;
}

export default function TableCell ({def, style, children}: DataTableCellProps)
{
	const injectedStyle = useMemo (
		() => ({
			textAlign: def.align ?? "left",
			justifyContent: def.align ?? "left",
			gridColumn: `span ${def.spanH ?? 1}`,
		}),
		[def.spanH, def.align]
	);
	const css = useStyle ("table", style, injectedStyle, "tableCellStyle");

	return (
		<div css = {css}>
			{children}
		</div>
	);
}