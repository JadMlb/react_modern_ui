import { OnTableRowClickFunction } from "../../../../types";
import { TableRowData } from "../../../../types/components/Table/TableRowData";
import TableRowProps from "./TableRowProps";
import TableCell from "../table_cell";

interface TableDataRowProps extends TableRowProps
{
	row: TableRowData;
	onClick?: OnTableRowClickFunction;
}

export default function TableRow ({row, columns, cellStyle, style, onClick}: TableDataRowProps)
{
	function handleClick ()
	{
		onClick?. (row);
	}
	
	return (
		<div
			css = {style}
			onClick = {handleClick}
		>{
			columns.map (
				col => <TableCell
							key = {col.name}
							def = {col}
							style = {cellStyle}
						>
							{row[col.name]}
						</TableCell>
			)
		}</div>
	);
}