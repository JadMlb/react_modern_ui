import { Overridable, OverridableProgressBarProps, ProgressBarStylingProps } from "../../../types";

const DEFAULT_PROGRESS_BAR_PROPS: Overridable<OverridableProgressBarProps, ProgressBarStylingProps> = {
	styles: {
		parentStyle: {
			width: "100%",
			display: "flex",
			gap: "spacing.small",
			fontSize: "0.8em",
			alignItems: "center"
		},
		backgroundStyle: (isDark, {thin}) => ({
			position: "relative",
			width: "100%",
			backgroundColor: `gray${isDark ? "Dark" : "Light"}`,
			borderRadius: "radius.large",
			height: thin ? 3 : 10
		}),
		style: (_, {percentage}) => ({
			height: "100%",
			width: `${percentage}%`,
			backgroundColor: "primary",
			transition: "width 100ms",
			borderRadius: "radius.large",
		})
	}
};

export default DEFAULT_PROGRESS_BAR_PROPS;