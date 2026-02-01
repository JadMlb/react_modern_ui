import { Overridable, OverridableSeparatorProps, SeparatorStylingProps } from "../../../types";

const DEFAULT_SEPARATOR_PROPS: Overridable<OverridableSeparatorProps, SeparatorStylingProps> = {
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