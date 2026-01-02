import { useMemo } from "react";
import { useDarkMode, useThemeParser } from "../../../../../styles";

interface ShowHideButtonProps
{
	shown?: boolean;
	onClick?: () => void;
}

export default function ShowHideButton ({shown, onClick}: ShowHideButtonProps)
{
	const isDark = useDarkMode();
	const parseCss = useThemeParser();
	const style = useMemo (
		() => parseCss ({
			all: "unset",
			marginInline: "spacing.small",
			cursor: "pointer",
			width: 20,
			height: 20,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			":before": {
				content: '""',
				display: "block",
				width: 15,
				height: 10,
				border: `1px solid ${isDark ? "white" : "black"}`,
				borderRadius: "radius.round",
			},
			":after": {
				content: '""',
				position: "absolute",
				display: "block",
				backgroundColor: `${isDark ? "white" : "black"}`,
				transition: ".25s",
				width: shown ? 2 : 7,
				height: shown ? 20 : 7,
				transform: shown ? "rotate(45deg)" : "none",
				borderRadius: "radius.round"
			}
		}),
		[isDark, shown]
	);

	return (
		<button
			css = {style}
			onClick = {onClick}
		/>
	);
}