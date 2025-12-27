import { Overridable, OverridableSwitchProps } from "../../../types";
import SwitchStylingProps from "../../../types/components/Switch/SwitchStylingProps";

const DEFAULT_SWITCH_PROPS: Overridable<OverridableSwitchProps, SwitchStylingProps> = {
	styles: {
		parentStyle: {
			display: "flex",
			gap: "spacing.medium",
			alignItems: "center",
			width: "fit-content"
		},
		handleStyle: {
			height: 20,
			width: 20,
			borderRadius: "radius.large",
			border: "1px solid gray",
			transition: "transform 0.3s ease-in-out"
		},
		activatedHandleStyle: {
			transform: `translateX(20px)`
		},
		style: isDark => ({
			cursor: "pointer",
			height: 20,
			width: 40,
			padding: "spacing.xxsmall",
			display: "flex",
			alignItems: "center",
			borderRadius: "radius.large",
			backgroundColor: `gray${isDark ? "Dark" : "Light"}`,
			borderWidth: 1,
			borderStyle: "solid",
			transition: "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out"
		})
	}
};

export default DEFAULT_SWITCH_PROPS;