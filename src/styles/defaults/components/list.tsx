import { ListStylingProps, Overridable, OverridableListProps } from "../../../types";

const DEFAULT_LIST_PROPS: Overridable<OverridableListProps, ListStylingProps> = {
	props: {
		renderer: item => item.id
	},
	styles: {
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
			boxShadow: `0 0 5px ${isDark ? "grayDark" : "grayLight"}`,
			"&.rmui-list-item-dragging": {
				opacity: "0.5 !important",
				backgroundColor: "red !important"
			}
		}),
		listItemDropAreaStyle: isDark => ({
			height: 5,
			width: "100%",
			"&.rmui-list-drop-area-hovered": {
				backgroundColor: `gray${isDark ? "Dark" : "Light"} !important`
			}
		})
	}
};

export default DEFAULT_LIST_PROPS;