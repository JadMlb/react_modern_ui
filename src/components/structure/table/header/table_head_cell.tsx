import { useMemo } from "react";
import { Style, useThemeParser } from "../../../../styles";
import TableSortButton from "../sort_button";
import TableCellProps from "../TableCellProps";
import TableCell from "../table_cell";
import { OnTableDataSortFunction } from "../../../../types";

interface TableHeadCellProps extends TableCellProps
{
	onSort?: OnTableDataSortFunction;
	sorting?: {
		isActive: boolean,
		desc?: boolean
	}
}

const DEFAULT_HEADER_CELL_STYLE = {
	fontWeight: "bold",
	alignItems: "center",
	cursor: "default"
} satisfies Style;

export default function TableHeadCell ({def, style, sorting, onSort}: TableHeadCellProps)
{
	const parseCss = useThemeParser();

	const cellStyle = useMemo (
		() => parseCss ({
			...DEFAULT_HEADER_CELL_STYLE,
			...style
		}),
		[parseCss, style, def.spanH, def.align]
	);

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
			style = {cellStyle}
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