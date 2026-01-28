import { Overridable } from "../../../types";
import { InputBaseStylingProps, OverridableInputBaseProps } from "../../../types/components/input/Base/InputBaseProps";

const DEFAULT_INPUT_BASE_PROPS: Overridable<OverridableInputBaseProps, InputBaseStylingProps> = {
	styles: {
		labelStyle: (_, {disabled}) => ({
			fontSize: "0.8rem",
			fontWeight: "bold",
			marginLeft: "calc(2 * spacing.xsmall)",
			color: disabled ? "gray" : "inherit"
		}),
		style: (isDark, {isError, disabled, readOnly}) => ({
			borderRadius: "radius.medium",
			padding: "spacing.small",
			display: "flex",
			alignItems: "center",
			position: "relative",
			gap: "spacing.small",
			border: `1px solid ${isError ? "error" : "gray"}`,
			color: disabled ? "gray" : undefined,
			backgroundColor: disabled || readOnly ? "unset" : `gray${isDark ? "Dark" : "Light"}`,
			":hover": {
				border: `1px solid ${disabled || readOnly ? "gray" : `primary${isDark ? "Dark" : "Elevated"}`}`
			},
			":focus": {
				border: `1px solid ${disabled || readOnly ? "gray" : "primary"}`
			}
		}),
		hintStyle: {
			marginLeft: "spacing.small",
			color: "gray"
		},
		errorTextStyle: {
			marginLeft: "spacing.small",
			color: "error"
		},
		fieldsetStyle: {
			display: "flex",
			flexDirection: "column",
			padding: "unset",
			margin: "unset",
			border: "unset"
		}
	}
};

export default DEFAULT_INPUT_BASE_PROPS;