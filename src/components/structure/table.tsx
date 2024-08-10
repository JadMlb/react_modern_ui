import React, { useMemo } from "react";
import { TableRow } from "../../types/TableRow";
import { TableStructure } from "../../types/TableStructure";

type TableProps = {
	data: TableRow[],
	structure: TableStructure
};

export default function Table ({data, structure}: TableProps)
{
	// specified proportions of in structure might not add up to 1 => map them from range 0-<sum> to range 0-1
	const actualProportions = useMemo (
		() =>
		{
			const PROPORTIONS_SUM = Object.values (structure.columns)
								.map (c => c.proportion)
								.reduce ((prev, cur) => prev + cur);
					
			let proportions = Object.entries(structure.columns).map (col => [col[0], col[1].proportion]);
			
			if (PROPORTIONS_SUM !== 1)
			{
				const SCALE_FACTOR = 1 / PROPORTIONS_SUM;

				proportions.map (entry => [entry[0], (entry[1] as number) * SCALE_FACTOR])
			}
			
			return Object.fromEntries (proportions);
		},
		[structure]
	);

	return (
		<>{console.log (actualProportions)}</>
	);
}