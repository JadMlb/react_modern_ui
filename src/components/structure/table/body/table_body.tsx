import { useMemo } from "react";
import useTableColumns from "../../../../hooks/useTableColumns";
import { Style, useThemeParser } from "../../../../styles";
import TableRowProps from "./TableRowProps";
import TableRow from "./table_row";
import { TableRowData } from "../../../../types/components/Table/TableRowData";
import { OnRowContextMenu, OnTableRowClickFunction } from "../../../../types";

interface TableBodyProps extends TableRowProps
{
	rows: TableRowData[];
	onRowClick?: OnTableRowClickFunction;
	onRowContextMenu?: OnRowContextMenu;
}

const DEFAULT_ROW_STYLE = {
	display: "grid",
	border: "1px solid gray",
	":last-of-type": {
		borderBottomLeftRadius: "radius.medium",
		borderBottomRightRadius: "radius.medium"
	}
} satisfies Style;

export default function TableBody ({rows, columns, cellStyle, style, onRowClick, onRowContextMenu}: TableBodyProps)
{
	const gridColumns = useTableColumns (columns);
	
	const parseCss = useThemeParser();

	const rowStyle = useMemo (
		() => parseCss ({
			...DEFAULT_ROW_STYLE,
			gridTemplateColumns: gridColumns,
			borderTop: "unset",
			cursor: "default",
			":hover": {
				backgroundColor: "color(from gray srgb r g b / 0.1)"
			},
			...style
		}),
		[parseCss, style, gridColumns]
	);
	
	return (
		<div>{
			rows.map (
				row => <TableRow
							key = {JSON.stringify (row)}
							columns = {columns}
							style = {rowStyle}
							cellStyle = {cellStyle}
							row = {row}
							onClick = {onRowClick}
							onContextMenu = {onRowContextMenu}
						/>
			)
		}</div>
	);
}