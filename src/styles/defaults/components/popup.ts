import { Style } from "../../../types";

const DEFAULT_POPUP_STYLE: Style = isDark => ({
	display: "flex",
	flexDirection: "column",
	gap: "spacing.medium",
	borderRadius: "radius.medium",
	padding: "spacing.large",
	backgroundColor: isDark ? "black" : "white",
	width: "50dvw",
});

export default DEFAULT_POPUP_STYLE;