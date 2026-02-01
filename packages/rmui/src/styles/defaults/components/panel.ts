import { Overridable, OverridablePanelProps, PanelStylingProps } from "../../../types";

const DEFAULT_PANEL_PROPS: Overridable<OverridablePanelProps, PanelStylingProps> = {
	styles: {
		toggleCollapseButtonStyle: {
			height: 30,
			width: 30,
			backgroundColor: "unset",
			borderRadius: "100%",
			marginLeft: "auto"
		},
		headerStyle: {
			display: "flex",
			flexDirection: "row",
			justifyContents: "space-between",
			alignItems: "center",
			position: "sticky",
			top: 0,
		},
		style: (_, {title}) => ({
			padding: "spacing.small",
			gap: "spacing.small",
			borderRadius: "radius.medium",
			position: "relative",
			display: "flex",
			flexDirection: "column",
			border: title !== undefined && title !== null ? "1px solid primary" : undefined
		})
	}
};

export default DEFAULT_PANEL_PROPS;