import { ButtonStylingProps, Overridable, OverridableButtonProps, Style } from "../../../types";

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

export const DEFAULT_FILLED_BUTTON_PROPS: Overridable<OverridableButtonProps, ButtonStylingProps> = {
	props: PROPS,
	styles: {
		style: (isDark, {role}) => ({
			...BASE_BUTTON_STYLES,
			borderRadius: "radius.medium",
			padding: "spacing.small",
			backgroundColor: role === "primary" ?
										"primary" :
										role === "warn" ?
											"error" :
											`gray${isDark ? "" : "Light"}`,
			color: isDark || role && ["primary", "warn"].includes (role) ?
									"white" :
									role === "alert" ?
										"error" :
										"black",
			fontWeight: role && ["primary", "transparent", "warn"].includes (role) ? "bold" : "normal",
			":hover": {
				backgroundColor: role === "warn" ?
											"errorDark" :
											role === "alert" ?
												"error" :
												role === "primary" ?
													"primaryDark" :
													"primaryElevated",
				color: role === "normal" ? "black" : "white",
			},
			":disabled": {
				color: "gray",
				backgroundColor: `gray${isDark ? "Dark" : "Light"}`
			}
		})
	}
};

export const DEFAULT_OUTLINED_BUTTON_PROPS: Overridable<OverridableButtonProps, ButtonStylingProps> = {
	props: PROPS,
	styles: {
		style: (isDark, {role}) => ({
			...BASE_BUTTON_STYLES,
			borderRadius: "radius.medium",
			borderWidth: 1.5,
			borderStyle: "solid",
			borderColor: role === "primary" ? "primary" : role === "warn" ? "error" : `gray${isDark ? "Dark" : "Light"}`,
			padding: `calc(spacing.small - 1.5px)`,
			backgroundColor: "transparent",
			color: role && ["primary", "normal"].includes (role) ?
									"primary" :
									"error",
			":hover": {
				backgroundColor: role && ["warn", "alert"].includes (role) ?
											isDark ? "errorDark" : "errorElevated":
											isDark ? "primaryDark": "primaryElevated",
			}
		})
	}
};

export const DEFAULT_LINK_BUTTON_PROPS: Overridable<OverridableButtonProps, ButtonStylingProps> = {
	props: PROPS,
	styles: {
		style: (isDark, {role}) => ({
			...BASE_BUTTON_STYLES,
			backgroundColor: "transparent",
			border: "unset",
			textDecoration: "none",
			color: role === "primary" ?
						"primary" :
						role === "warn" ?
							"error" :
							"inherit",
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
				background: role === "normal" || role === "primary" ? 
										`primary${isDark ? "Dark" : "Elevated"}` :
										`error${isDark ? "Dark" : "Elevated"}`
			},
			":hover::after": {
				height: "50%"
			}
		})
	}
};