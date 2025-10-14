import { Style } from "../../../../styles";
import { TableColumn } from "../../../../types";

export default interface TableRowProps
{
	columns: TableColumn[];
	cellStyle?: Style;
	style?: Style;
}