import { useEffect, useMemo, useState } from "react";
import TablePaginationProps from "./TablePaginationProps";
import PaginationButtons from "./pagination_buttons";
import PaginationPageSizes from "./page_sizes";

const DEFAULT_PAGE_OPTIONS = [5, 10, 15, 20];

export default function TablePagination ({rowsPerPage, dataSize, pageSizesOptions = DEFAULT_PAGE_OPTIONS, page = 0, style, onPageChange, onPageSizeChange}: TablePaginationProps)
{
	const [activePage, setActivePage] = useState (page);
	const [pageSize, setPageSize] = useState (rowsPerPage);
	
	function handlePageSizeChange (newPageSize: number)
	{
		setPageSize (newPageSize);
		onPageSizeChange?. (newPageSize);
	}

	useEffect (
		() => setActivePage (page),
		[page]
	);
	
	const realPageOptions = useMemo (
		() => pageSizesOptions.length === 0 ? [...DEFAULT_PAGE_OPTIONS] : [...pageSizesOptions].sort ((a, b) => a - b),
		[pageSizesOptions]
	);

	const realRowsPerPage = useMemo (
		() => pageSize !== undefined && realPageOptions.includes (pageSize) ?
				pageSize :
				realPageOptions[0],
		[pageSize, realPageOptions]
	);

	const nbPages = useMemo (
		() => Math.ceil (dataSize / realRowsPerPage),
		[dataSize, realRowsPerPage]
	);

	if (nbPages < 2)
		return null;

	return (
		<div css = {style}>
			<PaginationPageSizes
				current = {pageSize}
				options = {pageSizesOptions}
				onChange = {handlePageSizeChange}
			/>
			<PaginationButtons
				pages = {nbPages}
				activePage = {activePage}
				onPageChange = {onPageChange}
			/>
		</div>
	);
}