import { useMemo } from "react";
import PaginationBarProps from "./PaginationBarProps";
import PaginationButton from "./pagination_button";
import PaginationBarPropsBase from "./PaginationBarPropsBase";

interface DualWindowProps extends PaginationBarPropsBase
{
	startPage: number;
}

function DualWindow ({startPage, activePage = 0, onPageChange}: DualWindowProps)
{
	return (
		<>
			<PaginationButton
				key = {`table-nav-to-${startPage}`}
				page = {startPage}
				currentActivePage = {activePage}
				onPageChange = {onPageChange}
			/>
			<PaginationButton
				key = {`table-nav-to-${startPage + 1}`}
				page = {startPage + 1}
				currentActivePage = {activePage}
				onPageChange = {onPageChange}
			/>
		</>
	);
}

function TripleWindow ({activePage = 0, onPageChange}: PaginationBarPropsBase)
{
	const pagesInWindow = useMemo (
		() => [activePage, activePage + 1, activePage + 2],
		[activePage]
	);
	
	return (
		<>
			<PaginationButton
				key = {`table-nav-to-${pagesInWindow[0]}`}
				page = {pagesInWindow[0]}
				currentActivePage = {activePage}
				onPageChange = {onPageChange}
			/>
			<PaginationButton
				key = {`table-nav-to-${pagesInWindow[1]}`}
				page = {pagesInWindow[1]}
				currentActivePage = {activePage}
				onPageChange = {onPageChange}
			/>
			<PaginationButton
				key = {`table-nav-to-${pagesInWindow[2]}`}
				page = {pagesInWindow[2]}
				currentActivePage = {activePage}
				onPageChange = {onPageChange}
			/>
		</>
	);
}

export default function Window ({pages, activePage = 0, onPageChange}: PaginationBarProps)
{
	if (activePage <= 2)
		return (
			<DualWindow
				startPage = {2}
				activePage = {activePage}
				onPageChange = {onPageChange}
			/>
		);
	
	if (activePage >= pages - 3)
		return (
			<DualWindow
				startPage = {pages - 2}
				activePage = {activePage}
				onPageChange = {onPageChange}
			/>
		);

	return (
		<TripleWindow
			activePage = {activePage}
			onPageChange = {onPageChange}
		/>
	);
}