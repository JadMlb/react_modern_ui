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
		},
		table: {
			styles: {
				headerRowStyle: isDark => ({
					borderTopLeftRadius: "radius.small",
					borderTopRightRadius: "radius.small",
					backgroundColor: "transparent",
					color: isDark ? "white" : "black",
					border: `1px solid gray${isDark ? "Dark" : "Light"}`
				}),
				headerCellStyle: isDark => ({
					padding: "2px 5px",
					":not(:first-of-type)": {
						borderLeft: `1px solid gray${isDark ? "Dark" : "Light"}`
					}
				}),
				tableRowStyle: isDark => ({
					border: `1px solid gray${isDark ? "Dark" : "Light"}`,
					":last-of-type": {
						borderBottomLeftRadius: "radius.small",
						borderBottomRightRadius: "radius.small",
					}
				}),
				tableCellStyle: isDark => ({
					":first-of-type": {
						color: `primary${isDark ? "Elevated" : ""}`,
						fontWeight: "bold"
					},
					":not(:first-of-type)": {
						borderLeft: `1px solid gray${isDark ? "Dark" : "Light"}`
					}
				})
			}
		}
	}
});

export default theme;