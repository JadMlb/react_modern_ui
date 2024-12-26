import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius, spacing } from "../../styles/styles";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { ButtonProps } from "../../types/components/Button/ButtonProps";
import { ButtonStyle, DEFAULT_BUTTON_STYLES } from "../../types/components/Button/ButtonStyle";
import { ParserFactory } from "../../types/components/styles/generic/ParserFactory";
import { Parser } from "../../types/components/styles/generic/Parser";

const StyledButton = styled.button<{$css: string, $wide? : boolean, $rounded?: boolean}>
`
	border: none;
	font-size: inherit;
	${props => props.$wide && "width: 100%;"}
	transition: transform 0.25s ease-in-out;
	cursor: pointer;
	${
		props =>
			props.$rounded &&
				`
					width: 30px;
					height: 30px;
					padding: calc(${spacing.xsmall}/2);
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: ${radius.round};
					font-weight: bold;
					font: inherit;
				`}

	${props => props.$css}
`;

/**
 * Button component
 */
export default function Button ({role = "normal", type = "filled", wide, rounded, onClick, children, disabled = false, style}: ButtonProps)
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
			setRealStyle (style ?? DEFAULT_TYPE_STYLE (role, isDark ? "dark" : "light"));
		},
		[]
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
			$wide = {wide}
			$rounded = {rounded}
			onClick = {onClick}
			disabled = {disabled}
			$css = {css}
		>
			<span>{children}</span>
		</StyledButton>
	);
}