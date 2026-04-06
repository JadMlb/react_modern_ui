import { OnRowContextMenu, OnTableRowClickFunction } from "../../../../types";
import { TableRowData } from "../../../../types/components/Table/TableRowData";
import TableRowProps from "./TableRowProps";
import TableCell from "../table_cell";

interface TableDataRowProps extends TableRowProps
{
	row: TableRowData;
	onClick?: OnTableRowClickFunction;
	onContextMenu?: OnRowContextMenu;
}

export default function TableRow ({row, columns, cellStyle, style, cellContentStyle, onClick, onContextMenu}: TableDataRowProps)
{
	function handleClick ()
	{
		onClick?. (row);
	}
	
	function handleContextMenu (e: React.MouseEvent)
	{
		onContextMenu?. (e, row);
	}
	
	return (
		<div
			css = {style}
			onClick = {handleClick}
			onContextMenu = {handleContextMenu}
		>{
			columns.map (
				col => <TableCell
							key = {col.name}
							def = {col}
							style = {cellStyle}
							contentStyle = {cellContentStyle}
						>
							{row[col.name]}
						</TableCell>
			)
		}</div>
	);
}