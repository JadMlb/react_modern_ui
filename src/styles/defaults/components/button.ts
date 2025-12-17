import { Overridable, OverridableButtonProps, Style } from "../../../types";
import StylingProps from "../../../types/styles/StylingProps";

const PROPS = {
	role: "normal",
	htmlType: "button"
} satisfies OverridableButtonProps;

const BASE_BUTTON_STYLES = {
	border: "none",
	font: "inherit",
	transition: "transform 0.25s ease-in-out",
	cursor: "pointer",
	display: "flex",
	flexDirection: "row",
	gap: "spacing.small",
	alignItems: "center",
	justifyContent: "center"
} satisfies Style;

export const DEFAULT_FILLED_BUTTON_PROPS: Overridable<OverridableButtonProps, StylingProps> = {
	props: PROPS,
	styles: {
		style: isDark => ({
			...BASE_BUTTON_STYLES,
			borderRadius: "radius.medium",
			padding: "spacing.small",
			backgroundColor: `gray${isDark ? "" : "Light"}`,
			color: "black",
			":hover": {
				backgroundColor: `primary${isDark ? "Dark": "Elevated"}`,
				color: isDark ? "white" : "black",
			},
			":disabled": {
				color: "gray",
				backgroundColor: `gray${isDark ? "Dark" : "Light"}`
			}
		})
	}
};

export const DEFAULT_OUTLINED_BUTTON_PROPS: Overridable<OverridableButtonProps, StylingProps> = {
	props: PROPS,
	styles: {
		style: isDark => ({
			...BASE_BUTTON_STYLES,
			borderRadius: "radius.medium",
			border: `1.5px solid gray${isDark ? "Dark" : "Light"}`,
			padding: `calc(spacing.small - 1.5px)`,
			backgroundColor: "transparent",
			color: "error",
			":hover": {
				backgroundColor: isDark ? "primaryDark": "primaryElevated",
			}
		})
	}
};

export const DEFAULT_LINK_BUTTON_PROPS: Overridable<OverridableButtonProps, StylingProps> = {
	props: PROPS,
	styles: {
		style: isDark => ({
			...BASE_BUTTON_STYLES,
			backgroundColor: "transparent",
			border: "unset",
			textDecoration: "none",
			color: isDark ? "white" : "black",
			position: "relative",
			zIndex: 0,
			"::after": {
				content: '""',
				position: "absolute",
				bottom: 0,
				left: 0,
				width: "100%",
				zIndex: -1,
				height: 2,
				transition: "height 0.2s ease-in-out",
			},
			":hover::after": {
				height: "50%"
			}
		})
	}
};