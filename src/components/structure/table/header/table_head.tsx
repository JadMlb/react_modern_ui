import { useMemo, useState } from "react";
import TableHeadCell from "./table_head_cell";
import TableRowProps from "../body/TableRowProps";
import useTableColumns from "../../../../hooks/useTableColumns";
import { OnTableDataSortFunction } from "../../../../types";
import useStyle from "../../../../hooks/useStyle";

interface TableHeadProps extends TableRowProps
{
	onSort?: OnTableDataSortFunction;
}

export default function TableHead ({columns, style, cellStyle, onSort}: TableHeadProps)
{
	const gridColumns = useTableColumns (columns);
	const [sortingColumn, setSortingColumn] = useState<{column: string, desc?: boolean} | null> (null);

	function handleSort (column: string)
	{
		if (!onSort)
			return;

		let direction : "asc" | "desc" | null = null;
		let newSortingColumn : {column: string, desc?: boolean} | null = null;

		if (sortingColumn && sortingColumn.column === column && sortingColumn.desc === true)
		{
			newSortingColumn = null;
			direction = null;
		}
		else
		{
			let isDesc = sortingColumn?.column === column && !sortingColumn.desc;
			newSortingColumn = {
				column,
				desc: isDesc
			};
			direction = isDesc ? "desc" : "asc";
		}
		
		setSortingColumn (newSortingColumn);
		onSort (column, direction);
	}

	function getSortingValueOfColumn (c: string)
	{
		if (!sortingColumn?.column || sortingColumn.column !== c)
			return undefined;

		return {
			isActive: true,
			desc: sortingColumn.desc
		};
	}

	const injectedStyles = useMemo (
		() => ({
			gridTemplateColumns: gridColumns
		}),
		[style, gridColumns]
	);
	const css = useStyle ("table", style, injectedStyles, "headerRowStyle");
	
	return (
		<div css = {css}>{
			columns.map (
				col => <TableHeadCell
							key = {col.name}
							def = {col}
							style = {cellStyle}
							sorting = {getSortingValueOfColumn (col.name)}
							onSort = {handleSort}
						/>
			)
		}</div>
	);
}