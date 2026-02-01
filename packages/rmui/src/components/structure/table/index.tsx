import { useState } from "react";
import { TableProps } from "../../../types/components/Table/TableProps";
import TableBody from "./body/table_body";
import TableContainer from "./table_container";
import TableFooter from "./footer/table_footer";
import TableHead from "./header/table_head";
import TableHeading from "./heading/table_heading";
import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";

export default function Table (instanceProps: TableProps)
{
	const props = useProps ("table", instanceProps);
	const {
		heading,
		headingStyle,
		columns,
		headerRowStyle,
		headerCellStyle,
		rows,
		tableRowStyle,
		tableCellStyle,
		footer,
		footerStyle,
		pageSizes,
		pageSize,
		paginationStyle,
		totalNumberOfRows,
		onSort,
		onRowClick,
		onPageChange,
		onPageSizeChange,
		onContextMenu,
		onRowContextMenu,
		paginationNavigationButtonChevronColour,
		sortButtonChevronColour,
		forceMode,
		...rest
	} = props;
	
	const headingCss = useStyle ("table", props, headingStyle, "headingStyle");
	const headerRowCss = useStyle ("table", props, headerRowStyle, "headerRowStyle");
	const headerCellCss = useStyle ("table", props, headerCellStyle, "headerCellStyle");
	const tableRowCss = useStyle ("table", props, tableRowStyle, "tableRowStyle");
	const tableCellCss = useStyle ("table", props, tableCellStyle, "tableCellStyle");
	const footerCss = useStyle ("table", props, footerStyle, "footerStyle");
	const paginationCss = useStyle ("table", props, paginationStyle, "paginationStyle");
	
	const [activePage, setActivePage] = useState (0);

	function handlePageChange (oldPage: number, newPage: number)
	{
		setActivePage (newPage);
		onPageChange?. (oldPage, newPage);
	}
	
	return (
		<TableContainer onContextMenu = {onContextMenu} {...rest}>
			{/* heading */}
			<TableHeading style = {headingCss}>{heading}</TableHeading>
			{/* header */}
			<TableHead
				columns = {columns}
				onSort = {onSort}
				style = {headerRowCss}
				cellStyle = {headerCellCss}
				chevronColour = {sortButtonChevronColour}
			/>
			{/* body */}
			<TableBody
				columns = {columns}
				rows = {rows ?? []}
				style = {tableRowCss}
				cellStyle = {tableCellCss}
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
						style = {footerCss}
						paginationStyle = {paginationCss}
						chevronColour = {paginationNavigationButtonChevronColour}
						forceMode = {forceMode}
					>
						{footer}
					</TableFooter>
			}
		</TableContainer>
	);
}