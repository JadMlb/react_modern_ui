import { StaticStyle } from "../../../types";

const DEFAULT_POPUPS_BACKDROP_STYLE: StaticStyle = {
	position: "absolute",
	zIndex: 100000,
	top: 0,
	left: 0,
	width: "100dvw",
	height: "100dvh",
	backgroundColor: "color(from black srgb r g b / 0.5)",
	backdropFilter: "blur(10px)",
	display: "flex",
	alignItems: "center"
};

export default DEFAULT_POPUPS_BACKDROP_STYLE;