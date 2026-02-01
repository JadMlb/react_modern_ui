import { StaticStyle, TableColumn } from "../../../../types";

export default interface TableRowProps
{
	columns: TableColumn[];
	cellStyle?: StaticStyle;
	style?: StaticStyle;
}