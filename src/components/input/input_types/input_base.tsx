import * as React from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Style, useDarkMode, useThemeParser } from "../../../styles";
import { useEffect, useState } from "react";
import InputLabel from "./label";
import InputHint from "./hint";

const DEFAULT_STYLE: (isDark: boolean, disabled?: boolean, readonly?: boolean) => Style = (isDark, disabled = false, readonly = false) => ({
	backgroundColor: disabled || readonly ? "unset" : `gray${isDark ? "Dark" : "Light"}`,
	borderRadius: "radius.medium",
	padding: "spacing.small",
	display: "flex",
	alignItems: "center",
	position: "relative",
	gap: "spacing.small",
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
	labelStyle?: Style;
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
	({id, className, inputId, label, style, labelStyle, trailing, hint, textOnError, isError = false, hideLabel, disabled, readonly, children, onClick, onFocus, onBlur}, ref) =>
	{
		const isDark = useDarkMode();

		const parseTheme = useThemeParser();
		const [css, setCss] = useState<Style> ({});

		const fontColorStyle = React.useMemo (
			() => parseTheme ({color: disabled ? "gray" : "inherit", ...labelStyle}),
			[disabled, parseTheme, labelStyle]
		);

		useEffect (
			() =>
			{
				setCss (parseTheme ({
					...DEFAULT_STYLE (isDark, disabled, readonly),
					border: `1px solid ${isError ? "error" : "gray"}`,
					...style
				}));
			},
			[style, isDark, parseTheme, disabled, readonly, isError]
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
				<div
					css = {css}
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
				</div>
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