import { CheckboxStylingProps, Overridable, OverridableCheckboxProps } from "../../../types";

const DEFAULT_CHECKBOX_PROPS: Overridable<OverridableCheckboxProps, CheckboxStylingProps> = {
	styles: {
		style: (_, {disabled, readOnly}) => ({
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
				borderColor: disabled || readOnly ? "gray" : "primaryDark"
			},
			borderColor: disabled || readOnly ? "gray" : "primary"
		}),
		labelStyle: {
			display: "flex",
			alignItems: "center",
			gap: "spacing.xsmall"
		},
		checkedStyle: (_, {readOnly, disabled}) => ({
			border: "2px solid transparent",
			backgroundColor: readOnly || disabled ? "transparent" : "primary"
		}),
		intermediateStyle: (_, {readOnly, disabled}) => ({
			backgroundColor: readOnly || disabled ? "transparent" : "primary"
		})
	}
};

export default DEFAULT_CHECKBOX_PROPS;