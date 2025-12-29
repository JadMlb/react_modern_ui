import TableSortButton from "../sort_button";
import TableCellProps from "../TableCellProps";
import TableCell from "../table_cell";
import { OnTableDataSortFunction } from "../../../../types";
import useStyle from "../../../../hooks/useStyle";

interface TableHeadCellProps extends TableCellProps
{
	onSort?: OnTableDataSortFunction;
	sorting?: {
		isActive: boolean,
		desc?: boolean
	}
}

export default function TableHeadCell ({def, style, sorting, onSort}: TableHeadCellProps)
{
	const css = useStyle ("table", style, undefined, "headerCellStyle");

	function handleSort ()
	{
		let direction : "asc" | "desc" | null = null;
		if (sorting && sorting.isActive)
			direction = sorting.desc ? "desc" : "asc";
		onSort?. (def.name, direction);
	}

	return (
		<TableCell
			def = {def}
			style = {css}
		>
			{def.displayName}
			{
				def.sortable && onSort &&
				<TableSortButton
					onSort = {handleSort}
					order = {sorting?.desc ? "d" : "a"}
					active = {sorting?.isActive}
				/>
			}
		</TableCell>
	);
}