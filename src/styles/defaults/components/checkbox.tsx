import { Overridable, OverridableCheckboxProps } from "../../../types";
import { CheckboxStylingProps } from "../../../types/components/Checkbox/CheckboxStyleProps";
import DefaultCheck from "./default_check";
import DefaultIntermediate from "./default_intermediate";

const DEFAULT_CHECKBOX_PROPS: Overridable<OverridableCheckboxProps, CheckboxStylingProps> = {
	props: {
		checkedComponent: <DefaultCheck/>,
		intermediateComponent: <DefaultIntermediate/>
	},
	styles: {
		style: {
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
			}
		},
		labelStyle: {
			display: "flex",
			alignItems: "center",
			gap: "spacing.xsmall"
		},
		checkedStyle: {
			backgroundColor: "primary",
			border: "2px solid transparent"
		},
		intermediateStyle: {
			backgroundColor: "primary"
		}
	}
};

export default DEFAULT_CHECKBOX_PROPS;