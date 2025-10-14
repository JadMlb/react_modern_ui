import { Style } from "../../../styles";
import { TableColumn } from "../../../types";

export default interface TableCellProps
{
	def: TableColumn;
	style?: Style;
}