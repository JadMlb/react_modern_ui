import { Style } from "../../../styles";

export const DEFAULT_SLIDER_STYLE: Style = {
	cursor: "pointer",
	color: "primary",
	backgroundColor: "transparent",
	height: "spacing.xsmall",
	margin: "unset",
	borderRadius: "radius.small",
	border: "1px solid gray"
};

export const DEFAULT_SLIDER_THUMB_STYLE: Style = {
	width: 10,
	height: 10,
	marginTop: "calc(-2.5px - 1px)",
	borderRadius: "radius.round",
	backgroundColor: "primary"
};