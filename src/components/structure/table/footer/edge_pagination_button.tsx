import { useMemo } from "react";
import Chevron from "../../../chevron";
import { Button } from "../../../input";
import PaginationButtonProps from "./PaginationButtonProps";

interface EdgePaginationButtonProps extends PaginationButtonProps
{
	totalNbPages: number;
}

export default function EdgePaginationButton ({currentActivePage, page, totalNbPages, onPageChange}: EdgePaginationButtonProps)
{
	if (page >= 0)
		return null;

	function handlePageChange ()
	{
		const newPageAddition = page === -1 ? -1 : 1;
		onPageChange?. (currentActivePage, currentActivePage + newPageAddition);
	}

	const isDisabled = useMemo (
		() => page === -1 && currentActivePage === 0 ||
				page === -2 && currentActivePage === totalNbPages - 1,
		[currentActivePage, page]
	);
	
	return (
		<Button
			disabled = {isDisabled}
			onClick = {handlePageChange}
		>
			<Chevron orientation = {page === -1 ? "left" : "right"} inline inactive = {isDisabled}/>
		</Button>
	);
}