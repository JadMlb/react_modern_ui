import { radius } from "../../../styles";
import { ActionElementStyle } from "../styles/actionElement/ActionElementStyle";

const DEFAULT_TAG_STYLE: (isDark: boolean, colour: "affirmative" | "alert" | "error" | "gray") => ActionElementStyle = (isDark, colour) => ({
	borderRadius: radius.normal,
	backgroundColor: `${colour}${isDark ? "Dark" : ["affirmative"].includes (colour) ? "Elevated" : ""}`,
	color: isDark || ["error"].includes (colour) ? "white" : "black"
});

export default DEFAULT_TAG_STYLE;