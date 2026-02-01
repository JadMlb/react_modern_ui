import TablePaginationProps from "./TablePaginationProps";
import TablePagination from "./table_pagination";
import { StaticStyle } from "../../../../types";

interface TableFooterProps extends TablePaginationProps
{
	children?: React.ReactNode;
	paginationStyle?: StaticStyle;
}

export default function TableFooter ({children, style, paginationStyle, ...paginationProps}: TableFooterProps)
{	
	return (
		<div css = {style}>
			{children}
			<TablePagination {...paginationProps} style = {paginationStyle}/>
		</div>
	);
}