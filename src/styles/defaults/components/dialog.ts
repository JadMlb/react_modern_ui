import { Overridable, OverridableDialogProps, Style } from "../../../types";
import PopupStylingProps from "../../../types/components/Popups/PopupStylingProps";
import DEFAULT_POPUP_STYLE from "./popup";
import DEFAULT_POPUPS_BACKDROP_STYLE from "./popups_backdrop";

const HEADER_FOOTER_STYLE: Style = {
	display: "flex",
	flexDirection: "row",
	gap: "spacing.medium",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%"
};

const DEFAULT_DIALOG_PROPS: Overridable<OverridableDialogProps, PopupStylingProps> = {
	styles: {
		backdropStyle: DEFAULT_POPUPS_BACKDROP_STYLE,
		style: DEFAULT_POPUP_STYLE,
		headerStyle: HEADER_FOOTER_STYLE,
		footerStyle: HEADER_FOOTER_STYLE
	}
};

export default DEFAULT_DIALOG_PROPS;