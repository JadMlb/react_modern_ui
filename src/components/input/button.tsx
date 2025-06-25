import { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Style, useDarkMode, useThemeParser } from "../../styles/theme";
import { ButtonProps } from "../../types/components/Button/ButtonProps";
import { DEFAULT_BUTTON_STYLES } from "../../types/components/Button/ButtonStyle";
import { spacing } from "../../styles";

const StyledButton = styled.button
`
	border: none;
	font-size: inherit;
	transition: transform 0.25s ease-in-out;
	cursor: pointer;

	display: flex;
	flex-direction: row;
	gap: ${spacing.small};
	align-items: center;
	justify-content: center;
`;

/**
 * Button component
 */
export default function Button ({id, role = "normal", type = "filled", onClick, children, disabled = false, style, className}: ButtonProps)
{
	const isDark = useDarkMode();

	const parseTheme = useThemeParser();
	const [css, setCss] = useState<Style> ({});

	useEffect (
		() =>
		{
			const DEFAULT_TYPE_STYLE = DEFAULT_BUTTON_STYLES[type]!;
			if (DEFAULT_TYPE_STYLE)
				setCss (parseTheme ({...DEFAULT_TYPE_STYLE (role, isDark ? "dark" : "light"), ...style}));
		},
		[style, role, type, isDark, parseTheme]
	);

	return (
		<StyledButton
			css = {css}
			className = {className}
			id = {id}
			onClick = {onClick}
			disabled = {disabled}
		>
			{children}
		</StyledButton>
	);
}