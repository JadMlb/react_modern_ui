import { Style } from "../../styles";
import BasicCssStylingProps from "../../styles/BasicCssStylingProps";

export default interface GenericTableStylingProps<T> extends BasicCssStylingProps
{
	/**
	 * Defines the style of the table's header row
	 */
	headerRowStyle?: Style<T>;
	/**
	 * Defines the style of each cell in the table's header row
	 */
	headerCellStyle?: Style<T>;
	/**
	 * Defines the style of the table header cells' contents.
		* While `headerCellStyle` styles the entire cell, this prop handles styling a span wrapping the contents of
		* table cells to control text positionning inside of the cell, according to the cell's justification
	 */
	headerCellContentStyle?: Style<T>;
	/**
	 * Defines the style of the table's data rows
	 */
	tableRowStyle?: Style<T>;
	/**
	 * Defines the style of each cell in the table's data rows
	 */
	tableCellStyle?: Style<T>;
	/**
	 * Defines the style of the table's cells' contents.
		* While `tableCellStyle` styles the entire cell, this prop handles styling a span wrapping the contents of
		* table cells to control text positionning inside of the cell, according to the cell's justification
	 */
	cellContentStyle?: Style<T>;
	/**
	 * Defines the style of the table's heading
	 */
	headingStyle?: Style<T>;
	/**
	 * Defines the style of the table's footer
	 */
	footerStyle?: Style<T>;
	/**
	 * Defines the style of the table's pagination
	 */
	paginationStyle?: Style<T>;
}