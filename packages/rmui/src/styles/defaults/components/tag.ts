import { Overridable, OverridableTagProps, TagColour, TagStylingProps } from "../../../types";

function getTagColour (colour: TagColour)
{
	switch (colour)
	{
		case "success": return "affirmative";
		case "warning": return "alert";
		case "error": return "error";
		case "neutral":
		default:
			return "gray" as const;
	}
}

const DEFAULT_TAG_PROPS: Overridable<OverridableTagProps, TagStylingProps> = {
	styles: {
		style: (isDark, {colour = "neutral", onClick}) => ({
			width: "fit-content",
			textAlign: "center",
			paddingInline: "spacing.xsmall",
			display: "flex",
			gap: "spacing.xsmall",
			alignItems: "center",
			borderRadius: "radius.small",
			cursor: onClick ? "pointer" : "default",
			backgroundColor: `${getTagColour (colour)}${isDark ? "Dark" : ["affirmative"].includes (colour) ? "Elevated" : ""}`,
			color: isDark || ["error"].includes (colour) ? "white" : "black"
		})
	}
};

export default DEFAULT_TAG_PROPS;