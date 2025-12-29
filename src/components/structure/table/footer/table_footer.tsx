import TablePaginationProps from "./TablePaginationProps";
import TablePagination from "./table_pagination";
import { Style } from "../../../../types";
import useStyle from "../../../../hooks/useStyle";

interface TableFooterProps extends TablePaginationProps
{
	children?: React.ReactNode;
	paginationStyle?: Style;
}

export default function TableFooter ({children, style, paginationStyle, ...paginationProps}: TableFooterProps)
{	
	const css = useStyle ("table", style, undefined, "footerStyle");
	
	return (
		<div css = {css}>
			{children}
			<TablePagination {...paginationProps} style = {paginationStyle}/>
		</div>
	);
}