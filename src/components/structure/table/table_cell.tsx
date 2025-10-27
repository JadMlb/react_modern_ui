import { useMemo } from "react";
import { Style, useThemeParser } from "../../../styles";
import TableCellProps from "./TableCellProps";

const DEFAULT_CELL_STYLE = {
	":not(:first-of-type)": {
		borderLeft: "1px solid gray",
	},
	paddingBlock: "spacing.xxsmall",
	paddingInline: "spacing.xsmall",
	display: "flex"
} satisfies Style;

interface DataTableCellProps extends TableCellProps
{
	children?: React.ReactNode;
}

export default function TableCell ({def, style, children}: DataTableCellProps)
{
	const parseCss = useThemeParser();

	const cellStyle = useMemo (
		() => parseCss ({
			...DEFAULT_CELL_STYLE,
			textAlign: def.align ?? "left",
			justifyContent: def.align ?? "left",
			gridColumn: `span ${def.spanH ?? 1}`,
			...style
		}),
		[parseCss, style, def.spanH, def.align]
	);

	return (
		<div css = {cellStyle}>
			{children}
		</div>
	);
}