import { Overridable, OverridableListProps } from "../../../types";
import ListStylingProps from "../../../types/components/List/ListStylingProps";
import DefaultDragHandle from "./drag_handle";

const DEFAULT_LIST_PROPS: Overridable<OverridableListProps, ListStylingProps> = {
	props: {
		dragHandle: <DefaultDragHandle/>
	},
	styles: {
		renderer: item => item.id,
		style: {
			padding: "unset",
			margin: "unset",
			listStyleType: "none",
			display: "flex",
			flexDirection: "column",
			gap: "spacing.xsmall"
		},
		listItemStyle: isDark => ({
			padding: "spacing.xsmall",
			borderRadius: "radius.small",
			paddingLeft: "calc(2 * spacing.xsmall + 5px)",
			marginInline: "unset",
			position: "relative",
			display: "flex",
			alignItems: "center",
			gap: "spacing.medium",
			border: `1px solid ${isDark ? "grayDark" : "grayLight"}`,
			boxShadow: `0 0 5px ${isDark ? "grayDark" : "grayLight"}`
		}),
		listItemDropAreaStyle: {
			height: 5,
			width: "100%"
		}
	}
};

export default DEFAULT_LIST_PROPS;