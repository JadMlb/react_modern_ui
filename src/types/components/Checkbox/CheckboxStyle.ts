import { Style } from "../../styles";

export interface CheckboxStyle
{
	/**
	 * The style object defining how the basic checkbox is rendered
	 */
	checkbox?: Style;
	/**
	 * The styles attributed to the label of the checkbox
	 */
	label?: Style;
	/**
	 * The styles used to render a checked checkbox (aka when `state` is `true` or `2`)
	 */
	checked?: Style;
	/**
	 * The styles used to render an intermediate checkbox (aka when `state` is `1`)
	 */
	intermediate?: Style;
}

export const DEFAULT_CHECKBOX_STYLE: CheckboxStyle = {
	checkbox: {
		width: "17px",
		height: "17px",
		border: "2px solid primary",
		borderRadius: "radius.small",
		flexShrink: 0,
		display: "inline-block",
		cursor: "pointer",
		":focus": {
			borderColor: "primaryDark",
			outline: "none"
		}
	},
	checked: {
		backgroundColor: "primary",
		border: "2px solid transparent"
	},
	intermediate: {
		backgroundColor: "primary"
	}
} satisfies Style;