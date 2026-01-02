import { Overridable } from "../../../types";
import { OverridableInputBaseProps } from "../../../types/components/input/Base/InputBaseProps";
import InputBaseStylingProps from "../../../types/components/input/Base/InputBaseStylingProps";

const DEFAULT_INPUT_BASE_PROPS: Overridable<OverridableInputBaseProps, InputBaseStylingProps> = {
	styles: {
		labelStyle: {
			fontSize: "0.8rem",
			fontWeight: "bold",
			marginLeft: "calc(2 * spacing.xsmall)"
		},
		style: {
			borderRadius: "radius.medium",
			padding: "spacing.small",
			display: "flex",
			alignItems: "center",
			position: "relative",
			gap: "spacing.small"
		},
		hintStyle: {
			marginLeft: "spacing.small",
			color: "gray"
		},
		errorTextStyle: {
			marginLeft: "spacing.small",
			color: "error"
		}
	}
};

export default DEFAULT_INPUT_BASE_PROPS;