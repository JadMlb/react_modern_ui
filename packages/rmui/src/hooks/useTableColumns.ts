import { useEffect, useState } from "react";
import { TableColumn } from "../types";

export default function useTableColumns (columns: TableColumn[])
{
	const [gridColumns, setGridColumns] = useState ("");
	
	useEffect (
		() => setGridColumns (
			columns.map (
				(column) : string =>
				{
					const isNumber = typeof column.width === "number";
					return column.width !== undefined ? isNumber ? `${column.width}px` : `${column.width}` : "1fr";
				}
			)
			.join (" ")
		),
		[columns]
	);

	return gridColumns;
}