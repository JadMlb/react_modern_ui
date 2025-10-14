import { TableRowData } from "./TableRowData";
import TableColumn from "./TableColumn";
import { Style } from "../../../styles";

export default interface TableProps
{
	/**
	 * Defines the table's columns and types
	 */
	columns: TableColumn[];
	/**
	 * Defines the style of the table's header row
	 */
	headerRowStyle?: Style;
	/**
	 * Defines the style of each cell in the table's header row
	 */
	headerCellStyle?: Style;
	/**
	 * Passes the rows of the table
	 */
	rows?: TableRowData[];
	/**
	 * Total number of expected rows in order for pagination to work correctly
	 */
	totalNumberOfRows?: number;
	/**
	 * Defines the style of the table's data rows
	 */
	tableRowStyle?: Style;
	/**
	 * Defines the style of each cell in the table's data rows
	 */
	tableCellStyle?: Style;
	/**
	 * The elements to display in the heading of the table
	 */
	heading?: React.ReactNode;
	/**
	 * Defines the style of the table's heading
	 */
	headingStyle?: Style;
	/**
	 * Renders the following elements in the footer of the table
	 */
	footer?: React.ReactNode;
	/**
	 * Defines the style of the table's footer
	 */
	footerStyle?: Style;
	/**
	 * Page size options for pagination. Defaults to `[5, 10, 15]`.
	 */
	pageSizes?: number[];
	/**
	 * Current number of rows per page. Defaults to the first value of `pageSizes`. If `pageSizes` is not provided or incorrect, defaults to `5`.
	 */
	pageSize?: number;
	/**
	 * Defines the style of the table's pagination
	 */
	paginationStyle?: Style;
	/**
	 * Event fired when an entire row is clicked 
	 */
	onRowClick?: OnTableRowClickFunction;
	/**
	 * Callback fired when sorting on a column
	 */
	onSort?: OnTableDataSortFunction;
	/**
	 * Callback fired when pagination changes active page
	 */
	onPageChange?: OnPageChangeFunction;
	/**
	 * Callback fired when pagination changes page size
	 */
	onPageSizeChange?: OnPageSizeChangeFunction;
}

export type OnTableRowClickFunction = (row: TableRowData) => void;
export type OnTableDataSortFunction = (columnName: string, direction: "asc" | "desc" | null) => void;
export type OnPageChangeFunction = (oldPage: number, newPage: number) => void;
export type OnPageSizeChangeFunction = (newPageSize: number) => void;