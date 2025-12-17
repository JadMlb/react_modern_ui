import { Overridable, OverridablePanelProps } from "../../../types";
import PanelStylingProps from "../../../types/components/Panel/PanelStylingProps";

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
		style: {
			padding: "spacing.small",
			gap: "spacing.small",
			borderRadius: "radius.medium",
			position: "relative",
			display: "flex",
			flexDirection: "column",
		}
	}
};

export default DEFAULT_PANEL_PROPS;