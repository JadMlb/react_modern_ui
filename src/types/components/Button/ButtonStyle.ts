import { Style, radius, spacing } from "../../../styles";
import { ButtonRoles, ButtonTypes } from "./ButtonProps";

type DefaultButtonStyles = {
	[key in ButtonTypes]?: (role: ButtonRoles, theme?: "dark" | "light") => Style
}

export const DEFAULT_BUTTON_STYLES: DefaultButtonStyles = {
	filled: (role, theme = "light") => ({
		borderRadius: radius.normal,
		padding: spacing.small,
		fontWeight: ["primary", "transparent", "warn"].includes (role) ? "bold" : "normal",
		backgroundColor: role === "primary" ?
							"primary" :
							role === "warn" ?
								"error" :
								`gray${theme[0].toUpperCase()}${theme.slice (1)}`,
		color: theme === "dark" || ["primary", "warn"].includes (role) ?
						"white" :
						role === "alert" ?
							"error" :
							"black",
		":hover": {
			backgroundColor: role === "warn" ?
								"errorDark" :
								role === "alert" ?
									"error" :
									role === "primary" ?
										"primaryDark" :
										"primaryElevated",
			color: role === "normal" ? "black" : "white"
		},
		":disabled": {
			color: "gray",
			backgroundColor: `gray${theme[0].toUpperCase()}${theme.slice (1)}`
		}
	}),
	outlined: (role, theme = "light") => ({
		borderRadius: radius.normal,
		border: `1.5px solid ${role === "primary" ? "primary" : role === "warn" ? "error" : `gray${theme[0].toUpperCase()}${theme.slice (1)}`}`,
		padding: `calc(${spacing.small} - 1.5px)`,
		fontWeight: ["primary", "transparent", "warn"].includes (role) ? "bold" : "normal",
		backgroundColor: "transparent",
		color: ["primary", "normal"].includes (role) ?
						"primary" :
						"error",
		":hover": {
			backgroundColor: ["warn", "alert"].includes (role) ?
								theme === "dark" ? "errorDark" : "errorElevated":
								theme === "dark" ? "primaryDark": "primaryElevated",
		}
	}),
	link: (role, theme = "light") => ({
		backgroundColor: "transparent",
		border: "unset",
		textDecorationLine: "underline",
		textDecorationColor: role === "primary" ?
						"primary" :
						role === "warn" ?
							"error" :
							`gray`,
		color: theme === "light" ? "black" : "white",
		":hover": {
			color: ["warn", "alert"].includes (role) ?
						"error" :
						"primary"
		}
	})
}