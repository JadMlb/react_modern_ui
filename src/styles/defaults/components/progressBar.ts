import { Overridable, OverridableProgressBarProps } from "../../../types";
import ProgressBarStylingProps from "../../../types/components/ProgressBar/ProgressBarStylingProps";

const DEFAULT_PROGRESS_BAR_PROPS: Overridable<OverridableProgressBarProps, ProgressBarStylingProps> = {
	styles: {
		parentStyle: {
			width: "100%",
			display: "flex",
			gap: "spacing.small",
			fontSize: "0.8em",
			alignItems: "center"
		},
		backgroundStyle: isDark => ({
			position: "relative",
			width: "100%",
			backgroundColor: `gray${isDark ? "Dark" : "Light"}`,
			borderRadius: "radius.large"
		}),
		style: {
			height: "100%",
			backgroundColor: "primary",
			transition: "width 100ms",
			borderRadius: "radius.large"
		}
	}
};

export default DEFAULT_PROGRESS_BAR_PROPS;