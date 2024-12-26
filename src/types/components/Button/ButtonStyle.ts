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
	outlined: role => ({
		borderRadius: radius.normal,
		border: {
			width: "1px",
			style: "solid",
			color: "primary"
		},
		padding: spacing.small,
		fontWeight: ["primary", "transparent", "warn"].includes (role) ? "bold" : "normal",
	})
}