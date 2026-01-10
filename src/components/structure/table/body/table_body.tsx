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

export default function TableBody ({rows, columns, cellStyle, style, onRowClick, onRowContextMenu}: TableBodyProps)
{
	return (
		<div>{
			rows.map (
				row => <TableRow
							key = {JSON.stringify (row)}
							columns = {columns}
							style = {style}
							cellStyle = {cellStyle}
							row = {row}
							onClick = {onRowClick}
							onContextMenu = {onRowContextMenu}
						/>
			)
		}</div>
	);
}