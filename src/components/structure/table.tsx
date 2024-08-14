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
			
			const SCALE_FACTOR = 1 / PROPORTIONS_SUM;
			proportions = proportions.map (entry => [entry[0], (entry[1] as number) * SCALE_FACTOR * 100])
			
			return Object.fromEntries (proportions);
		},
		[structure]
	);

	return (
		<table width = "100%">
			<thead>
				<tr>
				{
					Object.entries (structure.columns)
						.map (
							col => <th style = {{width: `${actualProportions[col[0]]}%`}}>
										<span>{col[1].displayName ?? (col[0][0].toUpperCase() + col[0].slice (1))}</span>
										{structure.sortingColumns?.includes (col[0]) && <span>sort</span>}
									</th>
						)
				}
				</tr>
			</thead>
			<tbody>
			{
				data.map (
					row => <tr key = {row.id}>
							{
								Object.entries (structure.columns)
									.map (
										colDef => <td>
													{
														Object.keys (colDef[1].fields)
																.map (f => <span>{row[f]}</span>)
													}
													</td>
									)
							}
							</tr>
				)
			}
			</tbody>
		</table>
	);
}