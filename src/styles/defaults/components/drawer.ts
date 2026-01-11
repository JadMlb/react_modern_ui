import { DrawerStylingProps, Overridable, OverridableDrawerProps } from "../../../types";
import DEFAULT_POPUP_STYLE, { slideBottom, slideLeft, slideRight } from "./popup";
import DEFAULT_POPUPS_BACKDROP_STYLE from "./popups_backdrop";
import DEFAULT_HEADER_FOOTER_STYLE from "./popups_headers_footers";

const FLEX_DIRECTION = {
	"left": "row",
	"right": "row-reverse",
	"bottom": "row"
} as const;

const JUSTIFY_CONTENT = {
	"left": "flex-start",
	"right": "flex-start",
	"bottom": "flex-start"
} as const;

const DEFAULT_DRAWER_PROPS: Overridable<OverridableDrawerProps, DrawerStylingProps> = {
	styles: {
		backdropStyle: (_, {position}) => ({
			...DEFAULT_POPUPS_BACKDROP_STYLE,
			flexDirection: FLEX_DIRECTION[position ?? "right"],
			justifyContent: JUSTIFY_CONTENT[position ?? "right"],
			alignItems: position === "bottom" ? "stretch" : undefined
		}),
		style: (isDark, props) => ({
			...DEFAULT_POPUP_STYLE (isDark, props),
			maxHeight: "100dvh",
			width: props.position === "bottom" ? "100dvw" : "50dvw",
			animation: `${props.position === "right" ? slideRight : props.position === "left" ? slideLeft : slideBottom} 0.25s ease-in-out`,
			flex: props.position === "bottom" ? 1 : undefined
		}),
		headerStyle: DEFAULT_HEADER_FOOTER_STYLE,
		footerStyle: DEFAULT_HEADER_FOOTER_STYLE
	}
};

export default DEFAULT_DRAWER_PROPS;