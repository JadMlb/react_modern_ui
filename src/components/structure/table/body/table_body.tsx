import { useMemo } from "react";
import useTableColumns from "../../../../hooks/useTableColumns";
import TableRowProps from "./TableRowProps";
import TableRow from "./table_row";
import { TableRowData } from "../../../../types/components/Table/TableRowData";
import { OnRowContextMenu, OnTableRowClickFunction } from "../../../../types";
import useStyle from "../../../../hooks/useStyle";

interface TableBodyProps extends TableRowProps
{
	rows: TableRowData[];
	onRowClick?: OnTableRowClickFunction;
	onRowContextMenu?: OnRowContextMenu;
}

export default function TableBody ({rows, columns, cellStyle, style, onRowClick, onRowContextMenu}: TableBodyProps)
{
	const gridColumns = useTableColumns (columns);
	
	const injectedStyles = useMemo (
		() => ({
			gridTemplateColumns: gridColumns,
		}),
		[gridColumns]
	);
	const css = useStyle ("table", style, injectedStyles, "tableRowStyle");
	const cellCss = useStyle ("table", cellStyle, undefined, "tableCellStyle");
	
	return (
		<div>{
			rows.map (
				row => <TableRow
							key = {JSON.stringify (row)}
							columns = {columns}
							style = {css}
							cellStyle = {cellCss}
							row = {row}
							onClick = {onRowClick}
							onContextMenu = {onRowContextMenu}
						/>
			)
		}</div>
	);
}