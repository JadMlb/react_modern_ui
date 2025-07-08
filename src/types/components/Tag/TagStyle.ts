import { Style, radius } from "../../../styles";

const DEFAULT_TAG_STYLE: (isDark: boolean, colour: "affirmative" | "alert" | "error" | "gray") => Style = (isDark, colour) => ({
	borderRadius: radius.normal,
	backgroundColor: `${colour}${isDark ? "Dark" : ["affirmative"].includes (colour) ? "Elevated" : ""}`,
	color: isDark || ["error"].includes (colour) ? "white" : "black"
});

export default DEFAULT_TAG_STYLE;