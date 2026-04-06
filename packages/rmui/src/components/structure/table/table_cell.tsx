import { useMemo } from "react";
import TableCellProps from "./TableCellProps";

interface DataTableCellProps extends TableCellProps
{
	children?: React.ReactNode;
}

export default function TableCell ({def, style, contentStyle, children}: DataTableCellProps)
{
	const injectedStyle = useMemo (
		() => ({
			textAlign: def.align ?? "left",
			justifyContent: def.align ?? "left",
			gridColumn: `span ${def.spanH ?? 1}`,
		}),
		[def.spanH, def.align]
	);
	const css = useMemo (
		() => ({
			...style,
			...injectedStyle
		}),
		[style, injectedStyle]
	);

	return (
		<div css = {css}>
			<span css = {contentStyle}>{children}</span>
		</div>
	);
}