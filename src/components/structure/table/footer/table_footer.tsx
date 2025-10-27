import { useMemo } from "react";
import { Style, useThemeParser } from "../../../../styles";
import TablePaginationProps from "./TablePaginationProps";
import TablePagination from "./table_pagination";

interface TableFooterProps extends TablePaginationProps
{
	children?: React.ReactNode;
	paginationStyle?: Style;
}

const DEFAULT_STYLE = {
	display: "flex",
	gap: "spacing.medium",
	paddingBlock: "spacing.small",
	justifyContent: "flex-end",
	alignItems: "baseline"
} satisfies Style;

export default function TableFooter ({children, style, paginationStyle, ...paginationProps}: TableFooterProps)
{	
	const parseCss = useThemeParser();
	const realStyle = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			style
		}),
		[parseCss, style]
	);
	
	return (
		<div css = {realStyle}>
			{children}
			<TablePagination {...paginationProps} style = {paginationStyle}/>
		</div>
	);
}