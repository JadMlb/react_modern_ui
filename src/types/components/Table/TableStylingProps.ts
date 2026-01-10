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
	 * Defines the style of the table's data rows
	 */
	tableRowStyle?: Style<T>;
	/**
	 * Defines the style of each cell in the table's data rows
	 */
	tableCellStyle?: Style<T>;
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