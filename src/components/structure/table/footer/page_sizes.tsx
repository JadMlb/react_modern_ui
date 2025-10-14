import { useCallback, useEffect, useMemo, useState } from "react";
import { OnPageSizeChangeFunction, Option } from "../../../../types";
import { Combobox } from "../../../input";

interface PageSizesProps
{
	current?: number;
	options: number[];
	onChange?: OnPageSizeChangeFunction;
}

export default function PaginationPageSizes ({options, current, onChange}: PageSizesProps)
{
	const [activePageSize, setActivePageSize] = useState ("");

	const sortedOptions = useMemo (
		() => options.sort ((a, b) => a - b),
		[options.toString()]
	);
	
	const mappedOptions = useMemo (
		() => sortedOptions
						.map (
							p => ({
								value: `${p}`,
								display: `${p}`
							} satisfies Option)
						),
		[sortedOptions.toString()]
	);

	const handlePageSizeChange = useCallback (
		(_: React.ChangeEvent<Element> | null, value: any) =>
		{
			const pageSize = +value?.value;
			if (Number.isNaN (pageSize))
				return;
			setActivePageSize (`${pageSize}`);
			onChange?. (pageSize);
		},
		[onChange, setActivePageSize]
	);

	useEffect (
		() =>
		{
			setActivePageSize (current !== undefined && current !== null && sortedOptions.includes (current) ? `${current}` : `${sortedOptions[0]}`);
		},
		[setActivePageSize, current, sortedOptions]
	);
	
	return (
		<Combobox
			value = {activePageSize}
			options = {mappedOptions}
			onChange = {handlePageSizeChange}
		/>
	);
}