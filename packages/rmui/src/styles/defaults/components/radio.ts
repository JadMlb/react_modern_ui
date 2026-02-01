import { Overridable, OverridableRadioButtonsGroupProps, RadioButtonsGroupStylingProps } from "../../../types";

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