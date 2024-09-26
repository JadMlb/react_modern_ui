import React from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useDarkMode, useTheme } from "../../styles/theme";
import { colour, radius, spacing } from "../../styles/styles";
import ThemeType from "../../types/theme";

const Label = styled.label<{$hasLabel: boolean}>
`
	${
		props => props.$hasLabel &&
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
	/**
	 * Key of the Checkbox
	 */
	key?: number | string | bigint | null
	/**
	 * The label to be displayed next to the checkbox
	 */
	label?: string,
	/**
	 * Specifies whether the checkbox is checked or not. Defaults to `false`.
	 */
	isChecked?: boolean,
	/**
	 * Specifies whether the checkbox has a tri-state or not.
	 * - if not specified, the checkbox behaves normally with 2 states of checked/unchecked. 
	 * - if `false`, checkbox is in tri-state mode and displays a dash if `isChecked` is set to `true`, or nothing otherwise
	 * - if `true`, checkbox is in tri-state mode and displays a check mark if `isChecked` is set to `true`, or nothing otherwise
	 */
	isFull?: boolean,
	/**
	 * Specifies whether the checkbox should behave like a radiobutton or not. For this purpose, it is recommended to use a `RadioButtonsGroup`
	 */
	singleOption?: boolean,
	/**
	 * The change event handler to be fired when the checkbox state changes
	 */
	onChange?: React.ChangeEventHandler<HTMLInputElement>
};

/**
 * Renders a Checkbox component with specified state, either in normal checked/unchecked, or in tri-state mode (check `isFull` property with `isChecked`)
 */
export default function CheckBox ({label, isChecked, isFull, singleOption, onChange}: CheckBoxProps)
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