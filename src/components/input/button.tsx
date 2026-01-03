/** @jsxImportSource @emotion/react */
import { ButtonProps } from "../../types/components/Button/ButtonProps";
import useProps from "../../hooks/useProps";
import useStyle from "../../hooks/useStyle";
import { useCallback } from "react";

/**
 * Button component
 */
export default function Button (props: ButtonProps)
{
	const {
		role = "normal",
		type = "filled",
		htmlType,
		style,
		...rest
	} = useProps (`button.${props.type ?? "filled"}`, props);

	const injected = useCallback (
		(isDark: boolean) =>
		{
			switch (props.type)
			{
				case "filled": return {
					fontWeight: ["primary", "transparent", "warn"].includes (role) ? "bold" : "normal",
					backgroundColor: role === "primary" ?
										"primary" :
										role === "warn" ?
											"error" :
											`gray${isDark ? "Dark" : "Light"}`,
					color: isDark || ["primary", "warn"].includes (role) ?
									"white" :
									role === "alert" ?
										"error" :
										"black",
					":hover": {
						backgroundColor: role === "warn" ?
											"errorDark" :
											role === "alert" ?
												"error" :
												role === "primary" ?
													"primaryDark" :
													"primaryElevated",
						color: role === "normal" ? "black" : "white"
					},
				};
				case "outlined": return {
					borderColor: role === "primary" ? "primary" : role === "warn" ? "error" : `gray${isDark ? "Dark" : "Light"}`,
					fontWeight: ["primary", "transparent", "warn"].includes (role) ? "bold" : "normal",
					color: ["primary", "normal"].includes (role) ?
									"primary" :
									"error",
					":hover": {
						backgroundColor: ["warn", "alert"].includes (role) ?
											isDark ? "errorDark" : "errorElevated":
											isDark ? "primaryDark": "primaryElevated",
					}
				};
				case "link": return {
					color: role === "primary" ?
						"primary" :
						role === "warn" ?
							"error" :
							"inherit",
					"::after": {
						background: role === "normal" || role === "primary" ? 
										`primary${isDark ? "Dark" : "Elevated"}` :
										`error${isDark ? "Dark" : "Elevated"}`
					}
				};
				default: return {};
			}
		},
		[type, role]
	);
	
	const css = useStyle (`button.${type}`, style, injected);
	
	return (
		<button
			type = {htmlType}
			css = {css}
			{...rest}
		/>
	);
}