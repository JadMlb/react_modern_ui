import React from "react";
import styled, { css } from "styled-components";
import { colour, radius, spacing } from "../styles/styles";
import { useDarkMode, useTheme } from "../styles/theme";
import ThemeType from "../types/theme";

type ButtonRoles = "primary" | "transparent" | "alert" | "warn" | "normal";

const StyledButton = styled.button<{$isDark: boolean, $theme: ThemeType, $wide? : boolean, $rounded?: boolean, $role : ButtonRoles}>
`
	padding: ${props => props.$role === "transparent" ? "unset" : spacing.xsmall};
	border-radius: ${radius.normal};
	border: none;
	font-size: inherit;
	background-color: ${
		props =>
		["primary"].includes (props.$role) ?
			colour ("primary", props.$theme) :
				props.$role === "warn" ? 
					colour ("error", props.$theme) :
						props.$role === "transparent" ?
							"transparent" :
							colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)
	};
	color: ${
		props =>
		(props.$isDark || ["primary", "warn"].includes (props.$role)) ?
			colour ("white", props.$theme) :
			["alert"].includes (props.$role) ?
				colour ("error", props.$theme) :
				props.$role === "transparent" ?
					colour ("primary", props.$theme) :
					colour ("black", props.$theme)
	};
	font-weight: ${props => ["primary", "transparent", "warn"].includes (props.$role) ? "bold" : "normal"};
	${props => props.$wide && css`width: 100%;`}
	transition: transform 0.25s ease-in-out;
	cursor: pointer;
	${
		props =>
			props.$rounded && css
				`
					width: 30px;
					height: 30px;
					padding: calc(${spacing.xsmall}/2);
					border-radius: ${radius.round};
					font-weight: bold;
					font: inherit;
				`}

	&:hover:not(:disabled)
	{
		${
			props => props.$role !== "transparent" &&
				css
				`
					background-color: ${
						colour (
							["warn"].includes (props.$role) ?
								"errorDark" :
								["alert"].includes (props.$role) ?
									"error" :
									["primary"].includes (props.$role) || props.$isDark ?
										"primaryDark" :
										"primaryElevated",
							props.$theme
						)
					};
				`
		};

		${props => ["transparent"].includes (props.$role) && css `> span {border-bottom: 2px solid ${colour ("accent", props.$theme)};}`}

		${props => ["alert"].includes (props.$role) && css `color: ${colour ("white", props.$theme)};`}
		${
			props => !["alert", "warn", "primary", "transparent"].includes (props.$role) && props.$rounded &&
						css
						`
							box-sizing: border-box;
							padding: calc(${spacing.xsmall} - 8px) calc(${spacing.xsmall} - 2px);
							border: 2px solid ${colour ("primary", props.$theme)};
						`
		}
	}

	&:disabled
	{
		color: ${props => colour (props.$isDark ? "gray" : "grayLight", props.$theme)};
		background-color: ${props => colour (props.$isDark ? "black" : "white", props.$theme)};
		&:hover
		{
			border-bottom: unset;
			box-shadow: unset;
		}
	}
`;

type ButtonProps = {
	role? : ButtonRoles,
	// icon?: string,
	wide? : boolean,
	rounded?: boolean,
	children: React.ReactNode
	onClick?: React.MouseEventHandler<HTMLButtonElement>,
	disabled?: boolean
};

export default function Button ({role = "normal", wide, rounded, onClick, children, disabled = false}: ButtonProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();

	return (
		<StyledButton
			$role = {role}
			$wide = {wide}
			$rounded = {rounded}
			onClick = {onClick}
			disabled = {disabled}
			$isDark = {isDark}
			$theme = {theme}
		>
			<span>{children}</span>
		</StyledButton>
	);
}