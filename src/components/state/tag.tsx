import { useCallback } from "react";
import { TagColour, TagProps } from "../../types/components/Tag/TagProps";
import useProps from "../../hooks/useProps";
import useStyle from "../../hooks/useStyle";

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

export default function Tag (props: TagProps)
{
	const {id, className, colour = "neutral", style, onClick, children} = useProps ("tag", props);

	const injectedStyles = useCallback (
		(isDark: boolean) => ({
			cursor: onClick ? "pointer" : "default",
			backgroundColor: `${getTagColour (colour)}${isDark ? "Dark" : ["affirmative"].includes (colour) ? "Elevated" : ""}`,
			color: isDark || ["error"].includes (colour) ? "white" : "black"
		}),
		[colour, onClick]
	);
	const css = useStyle ("tag", style, injectedStyles);
	
	return (
		<div
			css = {css}
			className = {className}
			id = {id}
			onClick = {onClick}
		>
			{children}
		</div>
	);
}