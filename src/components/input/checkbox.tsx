import React from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { radius, spacing } from "../../styles/styles";
import { Colour } from "../../types";

const THICKNESS = "3px";

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

const CheckBoxBox = styled.div<{$single?: boolean, $isDark: boolean, $checked?: boolean, $colour: (col: Colour) => string}>
`
	width: 17px;
	height: 17px;

	display: inline-block;

	border: 1.5px solid ${props => props.$colour (props.$isDark ? "accent" : "accentDark")};
	border-radius: ${props => props.$single ? radius.round : radius.small};

	background-color: ${props => props.$colour (props.$isDark ? "black" : "white")};

	cursor: pointer;

	&:hover
	{
		border: 1.5px solid ${props => props.$colour ("primary")};
	}

	${
		props => props.$checked &&
		`background-color: ${props.$colour ("primary")} !important;
		border: 1.5px solid ${props.$colour ("primary")};
		&:hover
		{
			border: 1.5px solid ${props.$colour ("primaryDark")};
			background-color: ${props.$colour ("primaryDark")} !important;
		}`
	}
`;

const Check = styled.div<{$checked?: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	width: 4px;
	height: 11px;
	border-bottom: ${THICKNESS} solid ${props => props.$colour ("white")};
	border-right: ${THICKNESS} solid ${props => props.$colour ("white")};
	transform: rotate(45deg) translateX(2.5px) translateY(-3px);
	background-color: ${props => props.$checked ? props.$colour ("primary") : "transparent"} !important;
`;

const Dash = styled.div<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	width: 12px;
	height: ${THICKNESS};
	margin: 6.5px 2.5px;
	background-color: ${props => props.$colour ("white")};
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
	checked?: boolean,
	/**
	 * Specifies whether the checkbox is in tri-state mode or not.
	 * - if not specified (`undefined`), the checkbox behaves normally with 2 states of checked/unchecked, defined by the `checked` prop. 
	 * - if `full` is set to `false`, the checkbox is in tri-state mode and displays a **dash** if `checked` is set to `true`, or nothing otherwise
	 * - if `full` is set to `true`, the checkbox is in tri-state mode and displays a **check mark** if `checked` is set to `true`, or nothing otherwise
	 */
	full?: boolean,
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
export default function CheckBox ({label, checked, full, singleOption, onChange}: CheckBoxProps)
{
	const isDark = useDarkMode();
	const colour = useThemeColours();
	
	return (
		<Label
			$hasLabel = {label !== undefined && label !== null && label !== ""}
			onClick = {e => e.stopPropagation()}
		>
			<CheckBoxBox
				$single = {singleOption}
				$isDark = {isDark}
				$colour = {colour}
				$checked = {checked}
			>
			{
				checked &&
				(
					full === undefined || full ?
						<Check $isDark = {isDark} $colour = {colour}/> :
						<Dash $isDark = {isDark} $colour = {colour}/>
				)
			}
			</CheckBoxBox>
			<HiddenInput
				type = "checkbox"
				checked = {checked}
				onChange = {onChange}
			/>
			{label}
		</Label>
	);
}