import React, { useMemo } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Style, radius, spacing, useDarkMode, useThemeColours, useThemeParser } from "../../../styles";
import { useEffect, useState } from "react";
import { Colour } from "../../../types";
import InputLabel from "./label";
import InputHint from "./hint";

const DEFAULT_STYLE: (isDark: boolean, disabled?: boolean, readonly?: boolean) => Style = (isDark, disabled = false, readonly = false) => ({
	backgroundColor: disabled || readonly ? "unset" : `gray${isDark ? "Dark" : "Light"}`,
	borderRadius: radius.normal,
	border: "1px solid gray",
	padding: spacing.small,
	color: disabled ? "gray" : undefined,
	":hover": {
		border: `1px solid ${disabled || readonly ? "gray" : `primary${isDark ? "Dark" : "Elevated"}`}`
	},
	":focus": {
		border: `1px solid ${disabled || readonly ? "gray" : "primary"}`
	}
});

const Container = styled.div
`
	display: flex;
	flex-direction: column;
`;

const Wrapper = styled.div<{$isError?: boolean, $colour: (col: Colour) => string}>
`
	display: flex;
	gap: ${spacing.small};
	align-items: center;
	position: relative;
	${props => props.$isError && `border-color: ${props.$colour ("error")} !important;`}
`;

const Trailing = styled.div
`
	margin-left: auto;
`;

interface InputBaseProps
{
	inputId?: string;
	label?: string;
	children?: React.ReactNode;
	style?: Style;
	trailing?: React.ReactNode;
	hint?: string;
	textOnError?: string;
	isError?: boolean;
	hideLabel?: boolean;
	className?: string;
	id?: string;
	disabled?: boolean;
	readonly?: boolean;
	onClick?: React.MouseEventHandler;
	onFocus?: React.FocusEventHandler;
	onBlur?: React.FocusEventHandler;
}

const InputBase = React.forwardRef<HTMLDivElement, InputBaseProps> (
	({id, className, inputId, label, style, trailing, hint, textOnError, isError = false, hideLabel, disabled, readonly, children, onClick, onFocus, onBlur}, ref) =>
	{
		const colour = useThemeColours();
		const isDark = useDarkMode();

		const parseTheme = useThemeParser();
		const [css, setCss] = useState<Style> ({});

		const fontColorStyle = useMemo (
			() => parseTheme ({color: disabled ? "gray" : "inherit"}),
			[disabled, parseTheme]
		);

		useEffect (
			() =>
			{
				setCss (parseTheme ({
					...DEFAULT_STYLE (isDark, disabled, readonly),
					...style
				}));
			},
			[style, isDark, parseTheme, disabled, readonly]
		);
		
		return (
			<Container aria-disabled = {disabled}>
				<InputLabel
					htmlFor = {inputId}
					style = {fontColorStyle}
					hidden = {hideLabel}
				>
					{label}
				</InputLabel>
				<Wrapper
					css = {css}
					$isError = {isError}
					$colour = {colour}
					tabIndex = {0}
					onClick = {onClick}
					onFocus = {onFocus}
					onBlur = {onBlur}
					ref = {ref}
					className = {`rmui-input-base ${className ?? ""}`}
					id = {id}
				>
					{children}
					{
						trailing &&
							<Trailing>{trailing}</Trailing>
					}
				</Wrapper>
				<InputHint
					isError = {isError}
					hint = {hint}
					textOnError = {textOnError}
				/>
			</Container>
		);
	}
);

export default InputBase;