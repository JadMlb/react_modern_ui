import { useMemo } from "react";
import PaginationBarProps from "./PaginationBarProps";
import PaginationButton from "./pagination_button";

export default function FullPaginationButtons ({pages, activePage = 0, onPageChange}: PaginationBarProps)
{
	const pagesArray = useMemo (
		() => Array.from ({length: pages}, (_, i) => i + 1),
		[pages]
	);

	return (
		pagesArray.map (
			p => <PaginationButton
					key = {`table-nav-to-${p}`}
					page = {p}
					currentActivePage = {activePage}
					onPageChange = {onPageChange}
				/>
		)
	);
}