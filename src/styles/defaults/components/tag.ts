import { Overridable, OverridableTagProps } from "../../../types";
import StylingProps from "../../../types/styles/StylingProps";

const DEFAULT_TAG_PROPS: Overridable<OverridableTagProps, StylingProps> = {
	styles: {
		style: {
			width: "fit-content",
			textAlign: "center",
			paddingInline: "spacing.xsmall",
			display: "flex",
			gap: "spacing.xsmall",
			alignItems: "center",
			borderRadius: "radius.small",
		}
	}
};

export default DEFAULT_TAG_PROPS;