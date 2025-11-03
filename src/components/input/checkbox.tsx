import { useEffect, useMemo, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useDarkMode, useThemeColours, useThemeParser } from "../../styles";
import { spacing } from "../../styles/styles";
import { CheckboxProps } from "../../types/components/Checkbox/CheckboxProps";
import { Colour } from "../../types";
import { CheckboxStyle, DEFAULT_CHECKBOX_STYLE } from "../../types/components/Checkbox/CheckboxStyle";

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

const CheckBoxBox = styled.div<{$isDark: boolean, $checked?: boolean, $colour: (col: Colour) => string}>
`
	flex-shrink: 0;

	display: inline-block;

	background-color: ${props => props.$colour (props.$isDark ? "black" : "white")};

	cursor: pointer;
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

function CheckComponent ()
{
	const isDark = useDarkMode();
	const colour = useThemeColours();

	return <Check $isDark = {isDark} $colour = {colour}/>;
}

function DashComponent ()
{
	const isDark = useDarkMode();
	const colour = useThemeColours();

	return <Dash $isDark = {isDark} $colour = {colour}/>
}

/**
 * Renders a Checkbox component with specified value, either in normal checked/unchecked, or in tri-value
 */
export default function Checkbox ({id, name, value, className, style, label, labelStyle, intermediateStyle, checkedStyle, checkedComponent = <CheckComponent/>, intermediateComponent = <DashComponent/>, disabled, readonly, hideLabel, onChange}: CheckboxProps)
{
	const isDark = useDarkMode();
	const colour = useThemeColours();

	const parseTheme = useThemeParser();
	const [css, setCss] = useState<CheckboxStyle> ({});
	
	useEffect (
		() =>
		{
			const DEFAULT_STYLE = DEFAULT_CHECKBOX_STYLE (isDark ? "dark" : "light");
			if (DEFAULT_STYLE)
				setCss (
					old =>
					({
						...old,
						checkbox: parseTheme ({
							...DEFAULT_STYLE.checkbox,
							":hover": {
								borderColor: disabled || readonly ? "gray" : "primaryDark"
							},
							borderColor: disabled || readonly ? "gray" : "primary",
							...style
						}),
						checked: parseTheme ({...DEFAULT_STYLE.checked, ...checkedStyle}),
						intermediate: parseTheme ({...DEFAULT_STYLE.intermediate, ...intermediateStyle})
					})
				);
		},
		[style, checkedStyle, intermediateStyle, disabled, readonly, isDark, parseTheme]
	);

	useEffect (
		() =>
		{
			const DEFAULT_STYLE = DEFAULT_CHECKBOX_STYLE (isDark ? "dark" : "light");
				if (DEFAULT_STYLE)
					setCss (
						old => ({
							...old,
							label: parseTheme ({...DEFAULT_STYLE.label, ...labelStyle})
						})
					);
		},
		[labelStyle, isDark, parseTheme]
	);
	
	const isReallyChecked = useMemo (
		() => value === true || typeof value === "number" && value > 0,
		[value]
	);
	
	return (
		<Label
			className = {className}
			$hasLabel = {label !== undefined && label !== null && label !== ""}
			onClick = {e => e.stopPropagation()}
			css = {css.label}
			id = {id}
		>
			<CheckBoxBox
				$isDark = {isDark}
				$colour = {colour}
				$checked = {isReallyChecked}
				css = {{
					...css.checkbox,
					...(
						value === true || value === 2 ?
							css.checked :
							value === 1 ?
							css.intermediate : {}
					)
				}}
			>
			{
				!readonly && !disabled &&
					value === true || value === 2 ?
						checkedComponent :
						value === 1 ?
							intermediateComponent :
							<></>
			}
			</CheckBoxBox>
			<HiddenInput
				type = "checkbox"
				name = {name}
				checked = {isReallyChecked}
				onChange = {disabled || readonly ? undefined : e => onChange?. (e, e.target.value)}
				disabled = {disabled}
				readOnly = {readonly}
			/>
			{!hideLabel && label}
		</Label>
	);
}