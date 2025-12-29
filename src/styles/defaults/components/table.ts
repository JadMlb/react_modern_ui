import { Overridable, OverridableTableProps } from "../../../types";
import TableStylingProps from "../../../types/components/Table/TableStylingProps";

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
		headerRowStyle: {
			display: "grid",
			border: "1px solid gray",
			backgroundColor: "primary",
			color: "white",
			borderTopLeftRadius: "radius.medium",
			borderTopRightRadius: "radius.medium"
		},
		headerCellStyle: {
			fontWeight: "bold",
			alignItems: "center",
			cursor: "default"
		},
		tableRowStyle: {
			display: "grid",
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
		},
		tableCellStyle: {
			":not(:first-of-type)": {
				borderLeft: "1px solid gray",
			},
			paddingBlock: "spacing.xxsmall",
			paddingInline: "spacing.xsmall",
			display: "flex"
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