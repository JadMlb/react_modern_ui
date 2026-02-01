import { Overridable, OverridableMenuProps } from "../../../types";
import { MenuStylingProps } from "../../../types/components/Menu/MenuProps";


const DEFAULT_MENU_PROPS: Overridable<OverridableMenuProps, MenuStylingProps> = {
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
			borderRadius: "radius.medium",
			padding: "spacing.medium",
			backgroundColor: isDark ? "black" : "white",
			color: isDark ? "white" : "black",
			border: `1px solid gray${isDark ? "Dark" : "Light"}`
		})
	}
};

export default DEFAULT_MENU_PROPS;