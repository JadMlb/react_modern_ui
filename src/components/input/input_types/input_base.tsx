import React from "react";
import styled from "@emotion/styled";
import { radius, spacing, useDarkMode, useThemeColours } from "../../../styles";
import { ParserFactory } from "../../../types/components/styles/generic/ParserFactory";
import { useEffect, useState } from "react";
import { ActionElementStyle } from "../../../types/components/styles/actionElement/ActionElementStyle";
import { Parser } from "../../../types/components/styles/generic/Parser";
import { Colour } from "../../../types";

const DEFAULT_STYLE: (isDark: boolean) => ActionElementStyle = (isDark) => ({
	backgroundColor: `gray${isDark ? "Dark" : "Light"}`,
	borderRadius: radius.normal,
	border: {
		width: "1px",
		style: "solid",
		color: "gray"
	},
	padding: spacing.small,
	hover: {
		border: {
			width: "1px",
			style: "solid",
			"color": `primary${isDark ? "Dark" : "Elevated"}`
		}
	},
	focus: {
		border: {
			width: "1px",
			style: "solid",
			"color": "primary"
		}
	}
});

const Container = styled.div
`
	display: flex;
	flex-direction: column;
`;

const Wrapper = styled.div<{$css: string}>
`
	display: flex;
	gap: ${spacing.small};
	align-items: center;
	position: relative;
	${props => props.$css}
`;

const Label = styled.label
`
	font-size: 0.8rem;
	font-weight: bold;
	margin-left: calc(2 * ${spacing.xsmall});
`;

const Trailing = styled.div
`
	margin-left: auto;
`;

const Hint = styled.small<{$isError: boolean, $colour: (col: Colour) => string}>
`
	margin-left: ${spacing.small};
	color: ${props => props.$colour (props.$isError ? "error" : "gray")};
`;

interface InputBaseProps
{
	inputId?: string;
	label?: string;
	children?: React.ReactNode;
	style?: ActionElementStyle;
	trailing?: React.ReactNode;
	hint?: string;
	textOnError?: string;
	isError?: boolean;
	hideLabel?: boolean;
	className?: string;
	id?: string;
	onClick?: React.MouseEventHandler;
	onFocus?: React.FocusEventHandler;
	onBlur?: React.FocusEventHandler;
}

const InputBase = React.forwardRef<HTMLDivElement, InputBaseProps> (
	({inputId, label, style, trailing, hint, textOnError, isError = false, hideLabel, children, onClick, onFocus, onBlur}, ref) =>
	{
		const colour = useThemeColours();
		const isDark = useDarkMode();

		const parserFactory = new ParserFactory (colour);
		const [css, setCss] = useState<string> ("");
		const [realStyle, setRealStyle] = useState<ActionElementStyle> ();

		useEffect (
			() =>
			{
				setRealStyle ({
					...DEFAULT_STYLE (isDark),
					...style
				});
			},
			[style, isDark]
		);

		useEffect (
			() =>
			{
				if (realStyle)
					setCss ((parserFactory.getParser("") as Parser<ActionElementStyle>).parse (realStyle));
			},
			[realStyle]
		);
		
		return (
			<Container>
				{!hideLabel && <Label htmlFor = {inputId}>{label}</Label>}
				<Wrapper
					$css = {css}
					tabIndex = {0}
					onClick = {onClick}
					onFocus = {onFocus}
					onBlur = {onBlur}
					ref = {ref}
				>
					{children}
					{
						trailing &&
							<Trailing>{trailing}</Trailing>
					}
				</Wrapper>
				{
					(isError && textOnError || hint) &&
					<Hint $isError = {isError} $colour = {colour}>
						{isError ? textOnError : hint}
					</Hint>
				}
			</Container>
		);
	}
);

export default InputBase;