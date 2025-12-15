import { Style } from "../../styles";

export default interface TableStylingProps
{
	/**
	 * Defines the style of the table's header row
	 */
	headerRowStyle?: Style;
	/**
	 * Defines the style of each cell in the table's header row
	 */
	headerCellStyle?: Style;
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
	 * Defines the style of the table's pagination
	 */
	paginationStyle?: Style;
}