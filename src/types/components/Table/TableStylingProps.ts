import { Style } from "../../styles";
import StylingProps from "../../styles/StylingProps";

export default interface TableStylingProps extends Omit<StylingProps, "style">
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
	 * Defines the style of the table's heading
	 */
	headingStyle?: Style;
	/**
	 * Defines the style of the table's footer
	 */
	footerStyle?: Style;
	/**
	 * Defines the style of the table's pagination
	 */
	paginationStyle?: Style;
}