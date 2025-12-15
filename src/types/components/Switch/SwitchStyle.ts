import { Style } from "../../styles";

const HEIGHT = 20;

export const DEFAULT_SWITCH_BACKGROUND_STYLE: (isDark?: boolean, disabled?: boolean) => Style = (isDark, disabled) => ({
	cursor: "pointer",
	height: HEIGHT,
	width: 2 * HEIGHT,
	padding: "spacing.xxsmall",
	display: "flex",
	alignItems: "center",
	borderRadius: "radius.large",
	backgroundColor: "transparent",
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: disabled ? `gray${isDark ? "Dark" : "Light"}` : "gray",
	transition: "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out",
});

export const DEFAULT_ACTIVATED_SWITCH_BACKGROUND_STYLE: (isDark?: boolean, disabled?: boolean) => Style = (isDark, disabled) => ({
	backgroundColor: !disabled ? `affirmative${isDark ? "Dark" : ""}` : "transparent",
	borderColor: disabled ? `gray${isDark ? "Dark" : "Light"}` : `affirmative${isDark ? "" : "Elevated"}`
});

export const DEFAULT_SWITCH_HANDLE_STYLE: (isDark?: boolean, readonly?: boolean, disabled?: boolean) => Style = (isDark, readonly, disabled) => ({
	height: HEIGHT,
	width: HEIGHT,
	borderRadius: "radius.large",
	backgroundColor: `gray${readonly || disabled ? isDark ? "Dark" : "Light" : ""}`,
	transition: "transform 0.3s ease-in-out"
});

export const DEFAULT_ACTIVATED_SWITCH_HANDLE_STYLE: Style = {
	transform: `translateX(${HEIGHT}px)`
};