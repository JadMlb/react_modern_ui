import { Overridable, OverridableCardProps } from "../../../types";
import CardStylingProps from "../../../types/components/Card/CardStylingProps";

const DEFAULT_CARD_PROPS: Overridable<OverridableCardProps, CardStylingProps> = {
	styles: {
		titleStyle: {
			gridArea: "title",
			margin: "unset"
		},
		subtitleStyle: {
			gridArea: "subtitle",
			fontSize: "0.8em",
			color: "gray",
			margin: "unset"
		},
		style: isDark => ({
			position: "relative",
			overflow: "hidden",
			gap: "spacing.small",
			borderRadius: "radius.medium",
			border: `0.5px solid gray${isDark ? "Dark" : "Light"}`,
			boxShadow: `0 0 5px gray${isDark ? "Dark" : "Light"}`,
			width: "fit-content",
			height: "fit-content !important",
			display: "grid",
			padding: "spacing.small",
		})
	}
};

export default DEFAULT_CARD_PROPS;