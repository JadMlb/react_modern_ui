import { radius } from "../../../styles";
import { ActionElementStyle } from "../styles/actionElement/ActionElementStyle";

export const DEFAULT_CARD_STYLE: (clickable?: boolean, theme?: "dark" | "light") => ActionElementStyle = (clickable, theme = "light") =>
{
	let style: ActionElementStyle = {
		borderRadius: radius.normal,
		border: {
			width: "0.5px",
			style: "solid",
			color: theme === "dark" ? "grayDark" : "grayLight"
		},
		shadow: {
			offset: {x: 0, y: 0},
			spread: 5,
			colour: theme === "dark" ? "grayDark" : "grayLight"
		},
		width: "fit-content",
		height: "fit-content !important",
		hover: {}
	};

	if (clickable)
	{
		if (!style.hover)
			style.hover = {};
		
		style.hover.border! = {
			width: "1px",
			style: "solid",
			color: "primary"
		};
	}

	return style;
};