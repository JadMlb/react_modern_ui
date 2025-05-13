import { radius } from "../../../styles";
import { ActionElementStyle } from "../styles/actionElement/ActionElementStyle";
import { TextStyle } from "../styles/text/TextStyle";

export interface CheckboxStyle
{
	/**
	 * The style object defining how the basic checkbox is rendered
	 */
	checkbox?: ActionElementStyle;
	/**
	 * The styles attributed to the label of the checkbox
	 */
	label?: TextStyle;
	/**
	 * The styles used to render a checked checkbox (aka when `state` is `true` or `2`)
	 */
	checked?: ActionElementStyle;
	/**
	 * The styles used to render an intermediate checkbox (aka when `state` is `1`)
	 */
	intermediate?: ActionElementStyle;
}

export const DEFAULT_CHECKBOX_STYLE: (theme?: "dark" | "light") => CheckboxStyle = () =>
({
	checkbox: {
		width: "17px",
		height: "17px",
		border: {
			width: "2px",
			style: "solid",
			color: "primary"
		},
		borderRadius: radius.small,
		hover: {
			border: {
				color: "primaryDark",
				width: "2px",
				style: "solid"
			}
		}
	},
	checked: {
		backgroundColor: "primary",
		border: {
			width: "2px",
			style: "solid",
			color: "transparent"
		}
	}
})