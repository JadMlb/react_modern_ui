import { Overridable, OverridableMenuProps } from "../../../types";
import StylingProps from "../../../types/styles/StylingProps";

const DEFAULT_MENU_PROPS: Overridable<OverridableMenuProps, StylingProps> = {
	props: {
		position: {
			vertical: "bottom",
			horizontal: "left"
		},
		direction: {
			vertical: "bottom",
			horizontal: "right"
		}
	},
	styles: {
		style: isDark => ({
			position: "absolute",
			zIndex: "10000",
			borderRadius: "radius.medium",
			padding: "spacing.medium",
			backgroundColor: isDark ? "black" : "white",
			color: isDark ? "white" : "black",
			border: `1px solid gray${isDark ? "Dark" : "Light"}`
		})
	}
};

export default DEFAULT_MENU_PROPS;