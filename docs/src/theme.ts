import { createTheme } from "@jad-mlb/react-modern-ui";

const theme = createTheme ({
	overrides: {
		panel: {
			styles: {
				style: (isDark, {collapsible}) => ({
					backgroundColor: isDark ? "black" : "white",
					color: isDark ? "white" : "black",
					borderRadius: collapsible ? undefined : 0,
					colorScheme: isDark ? "dark" : "light"
				})
			}
		},
		link: {
			styles: {
				style: (isDark) => ({
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "radius.medium",
					padding: "spacing.small",
					backgroundColor: `gray${isDark ? "" : "Light"}`,
					color: isDark ? "white" : "black",
					":hover": {
						backgroundColor: "primaryElevated",
						color: "black"
					}
				})
			},
		}
	}
});

export default theme;