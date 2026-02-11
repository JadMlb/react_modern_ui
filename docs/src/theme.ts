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
				style: {
					":after": {
						backgroundColor: "primary"
					}
				}
			},
		},
		tag: {
			styles: {
				style: {
					display: "inline-flex"
				}
			}
		}
	}
});

export default theme;