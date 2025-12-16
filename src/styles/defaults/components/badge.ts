import { Overridable, OverridableBadgeProps } from "../../../types";
import WrappedElementStylingProps from "../../../types/styles/WrappedElementStylingProps";

const DEFAULT_BADGE_PROPS: Overridable<OverridableBadgeProps, WrappedElementStylingProps> = {
	props: {
		force: false,
		position: {vertical: "top", horizontal: "right"}
	},
	styles: {
		parentStyle: {
			position: "relative",
			width: "fit-content",
			height: "fit-content",
		},
		style: {
			position: "absolute",
			borderRadius: "radius.large",
			padding: "spacing.xsmall",
			backgroundColor: "error",
			color: "white",
			fontSize: "0.8em",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center"
		}
	}
};

export default DEFAULT_BADGE_PROPS;