import { Style, radius } from "../../../styles";

export const DEFAULT_CARD_STYLE: (clickable?: boolean, theme?: "dark" | "light") => Style = (clickable, theme = "light") =>
{
	let style = {
		borderRadius: radius.normal,
		border: `0.5px solid ${theme === "dark" ? "grayDark" : "grayLight"}`,
		boxShadow: `0 0 5px ${theme === "dark" ? "grayDark" : "grayLight"}`,
		width: "fit-content",
		height: "fit-content !important",
		":hover": {}
	} satisfies Style;

	if (clickable)
		style = {
			...style,
			":hover": {
				border: "1px solid primary"
			}
		}

	return style;
};