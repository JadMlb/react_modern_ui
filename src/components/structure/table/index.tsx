import { useState } from "react";
import TableProps from "../../../types/components/Table/TableProps";
import TableBody from "./body/table_body";
import TableContainer from "./table_container";
import TableFooter from "./footer/table_footer";
import TableHead from "./header/table_head";
import TableHeading from "./heading/table_heading";

export default function Table ({heading, headingStyle, columns, headerRowStyle, headerCellStyle, rows, tableRowStyle, tableCellStyle, footer, footerStyle, pageSizes, pageSize, paginationStyle, totalNumberOfRows, onSort, onRowClick, onPageChange, onPageSizeChange, onContextMenu, onRowContextMenu}: TableProps)
{
	const [activePage, setActivePage] = useState (0);

	function handlePageChange (oldPage: number, newPage: number)
	{
		setActivePage (newPage);
		onPageChange?. (oldPage, newPage);
	}
	
	return (
		<TableContainer onContextMenu = {onContextMenu}>
			{/* heading */}
			<TableHeading style = {headingStyle}>{heading}</TableHeading>
			{/* header */}
			<TableHead
				columns = {columns}
				onSort = {onSort}
				style = {headerRowStyle}
				cellStyle = {headerCellStyle}
			/>
			{/* body */}
			<TableBody
				columns = {columns}
				rows = {rows ?? []}
				style = {tableRowStyle}
				cellStyle = {tableCellStyle}
				onRowClick = {onRowClick}
				onRowContextMenu = {onRowContextMenu}
			/>
			{
				// footer / pagination
				totalNumberOfRows !== undefined && totalNumberOfRows > 0 &&
					<TableFooter
						dataSize = {totalNumberOfRows}
						page = {activePage}
						pageSizesOptions = {pageSizes}
						rowsPerPage = {pageSize}
						onPageChange = {handlePageChange}
						onPageSizeChange = {onPageSizeChange}
						style = {footerStyle}
						paginationStyle = {paginationStyle}
					>
						{footer}
					</TableFooter>
			}
		</TableContainer>
	);
}