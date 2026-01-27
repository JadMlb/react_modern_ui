import { Overridable, OverridableTableProps, TableColumn, TableStylingProps } from "../../../types";

function getColumnGrid (columns: TableColumn[])
{
	return columns.map (
		(column) : string =>
		{
			const isNumber = typeof column.width === "number";
			return column.width !== undefined ? isNumber ? `${column.width}px` : `${column.width}` : "1fr";
		}
	)
	.join (" ");
}

const DEFAULT_TABLE_PROPS: Overridable<OverridableTableProps, TableStylingProps> = {
	// FIXME: must be overridden and not merged
	props: {
		pageSizes: [5, 10, 15, 20]
	},
	styles: {
		headingStyle: {
			display: "flex",
			flexDirection: "row",
			gap: "spacing.medium",
			marginBlock: "spacing.large"
		},
		headerRowStyle: (_, {columns}) => ({
			display: "grid",
			gridTemplateColumns: getColumnGrid (columns),
			border: "1px solid gray",
			backgroundColor: "primary",
			color: "white",
			borderTopLeftRadius: "radius.medium",
			borderTopRightRadius: "radius.medium",
			overflow: "hidden"
		}),
		headerCellStyle: {
			fontWeight: "bold",
			alignItems: "center",
			cursor: "default"
		},
		tableRowStyle: (_, {columns}) => ({
			display: "grid",
			gridTemplateColumns: getColumnGrid (columns),
			border: "1px solid gray",
			":last-of-type": {
				borderBottomLeftRadius: "radius.medium",
				borderBottomRightRadius: "radius.medium"
			},
			borderTop: "unset",
			cursor: "default",
			":hover": {
				backgroundColor: "color(from gray srgb r g b / 0.1)"
			}
		}),
		tableCellStyle: {
			":not(:first-of-type)": {
				borderLeft: "1px solid gray",
			},
			paddingBlock: "spacing.xxsmall",
			paddingInline: "spacing.xsmall",
			display: "flex",
			textOverflow: "ellipsis"
		},
		footerStyle: {
			display: "flex",
			gap: "spacing.medium",
			paddingBlock: "spacing.small",
			justifyContent: "flex-end",
			alignItems: "baseline"
		},
		paginationStyle: {
			display: "flex",
			gap: "spacing.small",
			alignItems: "center",
			"button": {
				width: 30,
				height: 30
			}
		}
	}
};

export default DEFAULT_TABLE_PROPS;