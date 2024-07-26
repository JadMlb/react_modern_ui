import React from "react";
import styled, { css } from "styled-components";
import { useDarkMode, useTheme } from "../styles/theme";
import { colour, radius, spacing } from "../styles/styles";
import ThemeType from "../types/theme";

const Label = styled.label<{$hasLabel: boolean}>
`
	${
		props => props.$hasLabel &&
			css
			`
				display: flex;
				align-items: center;

				gap: calc(${spacing.xsmall} / 2);
			`
	}
`;

const CheckBoxBox = styled.div<{$single?: boolean, $isDark: boolean, $theme: ThemeType}>
`
	width: 17px;
	height: 17px;

	display: inline-block;

	border: 1px solid ${props => colour (props.$theme ? "accent" : "accentDark", props.$theme)};
	border-radius: ${props => props.$single ? radius.round : radius.small};

	background-color: ${props => colour (props.$isDark ? "black" : "white", props.$theme)};

	cursor: pointer;

	&:hover
	{
		border: 1px solid ${props => colour ("primary", props.$theme)};
		outline: 1px solid ${props => colour ("primary", props.$theme)};
		box-sizing: border-box;
	}
`;

const Check = styled.div<{$isDark: boolean, $theme: ThemeType}>
`
	width: 4px;
	height: 11px;
	border-bottom: 4px solid ${props => colour (props.$isDark ? "primaryElevated" : "primary", props.$theme)};
	border-right: 4px solid ${props => colour (props.$isDark ? "primaryElevated" : "primary", props.$theme)};
	transform: rotate(45deg) translateX(2.5px) translateY(-3px);
`;

const Dash = styled.div<{$isDark: boolean, $theme: ThemeType}>
`
	width: 12px;
	height: 4px;
	margin: 6.5px 2.5px;
	background-color: ${props => colour (props.$isDark ? "primaryElevated" : "primary", props.$theme)};
`;

const HiddenInput = styled.input
`
	display: none;
`;

export type CheckBoxProps = {
	key?: number | string | bigint | null
	label?: string,
	isChecked?: boolean,
	isFull?: boolean,
	singleOption?: boolean,
	onChange?: React.ChangeEventHandler<HTMLInputElement>
};

export function CheckBox ({label, isChecked, isFull, singleOption, onChange}: CheckBoxProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();
	
	return (
		<Label
			$hasLabel = {label !== undefined && label !== null && label !== ""}
			onClick = {e => e.stopPropagation()}
		>
			<CheckBoxBox
				$single = {singleOption}
				$isDark = {isDark}
				$theme = {theme}
			>
			{
				isChecked &&
				(
					isFull === undefined || isFull ?
						<Check $isDark = {isDark} $theme = {theme}/> :
						<Dash $isDark = {isDark} $theme = {theme}/>
				)
			}
			</CheckBoxBox>
			<HiddenInput
				type = "checkbox"
				checked = {isChecked}
				onChange = {onChange}
			/>
			{label}
		</Label>
	);
}