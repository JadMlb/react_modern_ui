import { Style } from "../../../styles";

const DEFAULT_TAG_STYLE: (isDark: boolean, colour: "affirmative" | "alert" | "error" | "gray", clickable?: boolean) => Style = (isDark, colour, clickable) => ({
	width: "fit-content",
	textAlign: "center",
	paddingInline: "spacing.xsmall",
	display: "flex",
	gap: "spacing.xsmall",
	alignItems: "center",
	cursor: clickable ? "pointer" : "default",
	borderRadius: "radius.small",
	backgroundColor: `${colour}${isDark ? "Dark" : ["affirmative"].includes (colour) ? "Elevated" : ""}`,
	color: isDark || ["error"].includes (colour) ? "white" : "black"
});

export default DEFAULT_TAG_STYLE;