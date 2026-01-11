import { CheckboxStylingProps, Overridable, OverridableCheckboxProps } from "../../../types";
import DefaultCheck from "./default_check";
import DefaultIntermediate from "./default_intermediate";

const DEFAULT_CHECKBOX_PROPS: Overridable<OverridableCheckboxProps, CheckboxStylingProps> = {
	props: {
		checkedComponent: <DefaultCheck/>,
		intermediateComponent: <DefaultIntermediate/>
	},
	styles: {
		style: (_, {disabled, readonly}) => ({
			width: 17,
			height: 17,
			border: "2px solid primary",
			borderRadius: "radius.small",
			flexShrink: 0,
			display: "inline-block",
			cursor: "pointer",
			":focus": {
				borderColor: "primaryDark",
				outline: "none"
			},
			":hover": {
				borderColor: disabled || readonly ? "gray" : "primaryDark"
			},
			borderColor: disabled || readonly ? "gray" : "primary"
		}),
		labelStyle: {
			display: "flex",
			alignItems: "center",
			gap: "spacing.xsmall"
		},
		checkedStyle: (_, {readonly, disabled}) => ({
			border: "2px solid transparent",
			backgroundColor: readonly || disabled ? "transparent" : "primary"
		}),
		intermediateStyle: (_, {readonly, disabled}) => ({
			backgroundColor: readonly || disabled ? "transparent" : "primary"
		})
	}
};

export default DEFAULT_CHECKBOX_PROPS;