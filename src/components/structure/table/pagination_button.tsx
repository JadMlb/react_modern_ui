import React from "react";
import { Button } from "../../input";

type PaginationButtonProps = {
	key?: string | number | bigint | null
	index: number,
	selected?: boolean,
	onPageRequest: (pageIndex: number) => void
};

export function PaginationButton ({index, selected, onPageRequest}: PaginationButtonProps)
{
	function navigate ()
	{
		onPageRequest (index);
	}

	return <Button
				role = {selected ? "primary" : "normal"}
				onClick = {navigate}
				rounded
			>
				{index + 1}
			</Button>;
}