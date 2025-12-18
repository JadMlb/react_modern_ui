import { Overridable, OverridableSeparatorProps } from "../../../types";
import WrappedElementStylingProps from "../../../types/styles/WrappedElementStylingProps";

const DEFAULT_SEPARATOR_PROPS: Overridable<OverridableSeparatorProps, WrappedElementStylingProps> = {
	styles: {
		parentStyle: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			gap: "spacing.small",
			color: "primary"
		},
		style: {
			height: 1,
			width: "100%",
			backgroundColor: "primary",
			border: "unset"
		}
	}
};

export default DEFAULT_SEPARATOR_PROPS;