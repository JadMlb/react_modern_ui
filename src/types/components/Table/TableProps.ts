import { TableRowData } from "./TableRowData";
import TableColumn from "./TableColumn";
import GenericTableStylingProps from "./TableStylingProps";
import { Props } from "../Props";

export default interface TableConfigProps
{
	/**
	 * Defines the table's columns and types
	 */
	columns: TableColumn[];
	/**
	 * Passes the rows of the table
	 */
	rows?: TableRowData[];
	/**
	 * Total number of expected rows in order for pagination to work correctly
	 */
	totalNumberOfRows?: number;
	/**
	 * Page size options for pagination.
	 * @default [5, 10, 15, 20]
	 */
	pageSizes?: number[];
	/**
	 * Current number of rows per page. Defaults to the first value of `pageSizes`. If `pageSizes` is not provided or incorrect.
	 * @default 5
	 */
	pageSize?: number;
	/**
	 * The elements to display in the heading of the table
	 */
	heading?: React.ReactNode;
	/**
	 * Renders the following elements in the footer of the table
	 */
	footer?: React.ReactNode;
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
	onContextMenu?: React.MouseEventHandler;
	onRowContextMenu?: OnRowContextMenu;
}

export type OnTableRowClickFunction = (row: TableRowData) => void;
export type OnTableDataSortFunction = (columnName: string, direction: "asc" | "desc" | null) => void;
export type OnPageChangeFunction = (oldPage: number, newPage: number) => void;
export type OnPageSizeChangeFunction = (newPageSize: number) => void;
export type OnRowContextMenu = (e: React.MouseEvent, row: TableRowData) => void;

export type TableStylingProps = GenericTableStylingProps<TableConfigProps>;
export type TableProps = Props<TableConfigProps, TableStylingProps>;

export type OverridableTableProps = Pick<TableProps, "onRowClick" | "onContextMenu" | "onRowContextMenu" | "onPageChange" | "onPageSizeChange" | "pageSizes" | "heading" | "footer">;