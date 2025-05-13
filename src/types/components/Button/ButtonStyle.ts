import { radius, spacing } from "../../../styles";
import { ActionElementStyle } from "../styles/actionElement/ActionElementStyle";
import { ButtonRoles, ButtonTypes } from "./ButtonProps";

export interface ButtonStyle extends ActionElementStyle
{}

type DefaultButtonStyles = {
	[key in ButtonTypes]?: (role: ButtonRoles, theme?: "dark" | "light") => ButtonStyle
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
		fontColor: theme === "dark" || ["primary", "warn"].includes (role) ?
						"white" :
						role === "alert" ?
							"error" :
							"black",
		hover: {
			backgroundColor: role === "warn" ?
								"errorDark" :
								role === "alert" ?
									"error" :
									role === "primary" ?
										"primaryDark" :
										"primaryElevated",
			fontColor: role === "normal" ? "black" : "white"
		},
		disabled: {
			fontColor: "gray",
			backgroundColor: `gray${theme[0].toUpperCase()}${theme.slice (1)}`
		}
	}),
	outlined: (role, theme = "light") => ({
		borderRadius: radius.normal,
		border: {
			width: "1.5px",
			style: "solid",
			color: role === "primary" ?
					"primary" :
					role === "warn" ?
						"error" :
						`gray${theme[0].toUpperCase()}${theme.slice (1)}`
		},
		padding: `calc(${spacing.small} - 1.5px)`,
		fontWeight: ["primary", "transparent", "warn"].includes (role) ? "bold" : "normal",
		backgroundColor: "transparent",
		fontColor: ["primary", "normal"].includes (role) ?
						"primary" :
						"error",
		hover: {
			backgroundColor: ["warn", "alert"].includes (role) ?
								theme === "dark" ? "errorDark" : "errorElevated":
								theme === "dark" ? "primaryDark": "primaryElevated",
		}
	}),
	link: (role, theme = "light") => ({
		backgroundColor: "transparent",
		border: null,
		underlineColor: role === "primary" ?
						"primary" :
						role === "warn" ?
							"error" :
							`gray`,
		color: theme === "light" ? "black" : "white",
		hover: {
			color: ["warn", "alert"].includes (role) ?
						"error" :
						"primary"
		}
	} satisfies ButtonStyle)
}