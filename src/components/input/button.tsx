import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { ButtonProps } from "../../types/components/Button/ButtonProps";
import { ButtonStyle, DEFAULT_BUTTON_STYLES } from "../../types/components/Button/ButtonStyle";
import { ParserFactory } from "../../types/components/styles/generic/ParserFactory";
import { Parser } from "../../types/components/styles/generic/Parser";

const StyledButton = styled.button<{$css: string}>
`
	border: none;
	font-size: inherit;
	transition: transform 0.25s ease-in-out;
	cursor: pointer;

	${props => props.$css}
`;

/**
 * Button component
 */
export default function Button ({role = "normal", type = "filled", onClick, children, disabled = false, style, className}: ButtonProps)
{
	const isDark = useDarkMode();
	const colour = useThemeColours();

	const parserFactory = new ParserFactory (colour);
	const [css, setCss] = useState ("");
	const [realStyle, setRealStyle] = useState<ButtonStyle> ();

	useEffect (
		() =>
		{
			const DEFAULT_TYPE_STYLE = DEFAULT_BUTTON_STYLES[type]!;
			if (DEFAULT_TYPE_STYLE)
				setRealStyle ({... DEFAULT_TYPE_STYLE (role, isDark ? "dark" : "light"), ...style});
		},
		[style]
	);
	
	useEffect (
		() =>
		{
			if (realStyle)
				setCss ((parserFactory.getParser("") as Parser<ButtonStyle>).parse (realStyle));
		},
		[realStyle]
	);

	return (
		<StyledButton
			onClick = {onClick}
			disabled = {disabled}
			$css = {css}
			className = {className}
		>
			<span>{children}</span>
		</StyledButton>
	);
}