import { BadgeStylingProps, Overridable, OverridableBadgeProps } from "../../../types";

const DEFAULT_BADGE_PROPS: Overridable<OverridableBadgeProps, BadgeStylingProps> = {
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
		style: (_, {position, force, value}) => ({
			position: "absolute",
			borderRadius: "radius.large",
			padding: "spacing.xsmall",
			backgroundColor: "error",
			color: "white",
			fontSize: "0.8em",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
			[position!.horizontal!]: 0,
			[position!.vertical!]: 0,
			transform: `translate(${position!.horizontal === "left" ? "-" : ""}50%, ${position!.vertical === "top" ? "-" : ""}50%)`,
			height: force || !value ? undefined : 10,
			minWidth: force || !value ? undefined : 10,
		})
	}
};

export default DEFAULT_BADGE_PROPS;