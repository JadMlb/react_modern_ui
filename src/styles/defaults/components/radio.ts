import { Overridable, OverridableRadioButtonsGroupProps } from "../../../types";
import RadioButtonsGroupStylingProps from "../../../types/components/RadioButtonsGroup/RadioButtonsGroupStylingProps";

const DEFAULT_RADIO_BUTTONS_GROUP_PROPS: Overridable<OverridableRadioButtonsGroupProps, RadioButtonsGroupStylingProps> = {
	styles: {
		clearButtonStyle: {
			width: "fit-content"
		},
		style: {
			flexDirection: "column",
			alignItems: "unset",
			width: "fit-content",
			backgroundColor: "transparent"
		},
		checkboxStyle: {
			borderRadius: "100%"
		}
	}
};

export default DEFAULT_RADIO_BUTTONS_GROUP_PROPS;