import { Overridable, OverridableSwitchProps, SwitchStylingProps } from "../../../types";

const DEFAULT_SWITCH_PROPS: Overridable<OverridableSwitchProps, SwitchStylingProps> = {
	styles: {
		parentStyle: {
			display: "flex",
			gap: "spacing.medium",
			alignItems: "center",
			width: "fit-content"
		},
		handleStyle: (isDark, {readOnly, disabled}) => ({
			height: 20,
			width: 20,
			borderRadius: "radius.large",
			border: "1px solid gray",
			transition: "transform 0.3s ease-in-out",
			backgroundColor: readOnly || disabled ? `gray${isDark ? "Dark" : "Light"}` : "white"
		}),
		activatedHandleStyle: {
			transform: `translateX(20px)`
		},
		style: (isDark, {disabled}) => ({
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
			borderColor: disabled ? `gray${isDark ? "Dark" : "Light"}` : "gray",
			transition: "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out",
		}),
		activatedStyle: (isDark, {disabled}) => ({
			backgroundColor: !disabled ? `affirmative${isDark ? "Dark" : ""}` : "transparent",
			borderColor: disabled ? `gray${isDark ? "Dark" : "Light"}` : `affirmative${isDark ? "" : "Elevated"}`
		})
	}
};

export default DEFAULT_SWITCH_PROPS;