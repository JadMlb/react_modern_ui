import { DialogStylingProps, Overridable, OverridableDialogProps } from "../../../types";
import DEFAULT_POPUP_STYLE, { slideBottom } from "./popup";
import DEFAULT_POPUPS_BACKDROP_STYLE from "./popups_backdrop";
import DEFAULT_HEADER_FOOTER_STYLE from "./popups_headers_footers";

const DEFAULT_DIALOG_PROPS: Overridable<OverridableDialogProps, DialogStylingProps> = {
	styles: {
		backdropStyle: {
			...DEFAULT_POPUPS_BACKDROP_STYLE,
			flexDirection: "row",
			justifyContent: "center"
		},
		style: {
			...DEFAULT_POPUP_STYLE,
			width: "50dvw",
			height: "fit-content",
			animation: `${slideBottom} 0.25s ease-in-out`,
		},
		headerStyle: DEFAULT_HEADER_FOOTER_STYLE,
		footerStyle: DEFAULT_HEADER_FOOTER_STYLE
	}
};

export default DEFAULT_DIALOG_PROPS;