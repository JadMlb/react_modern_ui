import TableSortButton from "../sort_button";
import TableCellProps from "../TableCellProps";
import TableCell from "../table_cell";
import { OnTableDataSortFunction } from "../../../../types";

interface TableHeadCellProps extends TableCellProps
{
	chevronColour?: string;
	onSort?: OnTableDataSortFunction;
	sorting?: {
		isActive: boolean,
		desc?: boolean
	}
}

export default function TableHeadCell ({def, style, sorting, onSort, chevronColour}: TableHeadCellProps)
{
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
			style = {style}
		>
			{def.displayName}
			{
				def.sortable && onSort &&
				<TableSortButton
					onSort = {handleSort}
					order = {sorting?.desc ? "d" : "a"}
					active = {sorting?.isActive}
					chevronColour = {chevronColour}
				/>
			}
		</TableCell>
	);
}