import { useEffect, useMemo, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { spacing } from "../../styles/styles";
import { CheckboxProps } from "../../types/components/Checkbox/CheckboxProps";
import { Colour } from "../../types";
import { ParserFactory } from "../../types/components/styles/generic/ParserFactory";
import { ActionElementStyle } from "../../types/components/styles/actionElement/ActionElementStyle";
import { CheckboxStyle, DEFAULT_CHECKBOX_STYLE } from "../../types/components/Checkbox/CheckboxStyle";
import { Parser } from "../../types/components/styles/generic/Parser";
import { TextStyle } from "../../types/components/styles/text/TextStyle";

const THICKNESS = "3px";

const Label = styled.label<{$hasLabel: boolean, $css: string}>
`
	${
		props => props.$hasLabel &&
			`
				display: flex;
				align-items: center;

				gap: calc(${spacing.xsmall} / 2);
			`
	}

	${props => props.$css}
`;

const CheckBoxBox = styled.div<{$css: string, $isDark: boolean, $checked?: boolean, $colour: (col: Colour) => string}>
`
	flex-shrink: 0;

	display: inline-block;

	background-color: ${props => props.$colour (props.$isDark ? "black" : "white")};

	cursor: pointer;

	${props => props.$css}
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
 * Renders a Checkbox component with specified state, either in normal checked/unchecked, or in tri-state
 */
export default function Checkbox ({state, className, style, label, labelStyle, intermediateStyle, checkedStyle, checkedComponent = <CheckComponent/>, intermediateComponent = <DashComponent/>, onChange}: CheckboxProps)
{
	const isDark = useDarkMode();
	const colour = useThemeColours();

	const parserFactory = new ParserFactory (colour);
	const [css, setCss] = useState<{checkbox: string, label: string, checked: string, intermediate: string}> ({checkbox: "", label: "", intermediate: "", checked: ""});
	const [realStyle, setRealStyle] = useState<CheckboxStyle> ();

	useEffect (
		() =>
		{
			const DEFAULT_STYLE = DEFAULT_CHECKBOX_STYLE (isDark ? "dark" : "light");
			if (DEFAULT_STYLE)
				setRealStyle (
					old =>
					({
						...old,
						checkbox: {...DEFAULT_STYLE.checkbox, ...style},
						checked: {...DEFAULT_STYLE.checked, ...checkedStyle},
						intermediate: {...DEFAULT_STYLE.intermediate, ...intermediateStyle}
					})
				);
		},
		[style, checkedStyle, intermediateStyle, isDark]
	);

	useEffect (
		() =>
		{
			const DEFAULT_STYLE = DEFAULT_CHECKBOX_STYLE (isDark ? "dark" : "light");
				if (DEFAULT_STYLE)
					setRealStyle (old => ({...old, label: {...DEFAULT_STYLE.label, ...labelStyle}}));
		},
		[labelStyle, isDark]
	);
	
	useEffect (
		() =>
		{
			let label = realStyle?.label ? (parserFactory.getParser("") as Parser<TextStyle>).parse (realStyle.label ?? {}) : null,
				checkbox = realStyle?.checkbox ? (parserFactory.getParser("") as Parser<ActionElementStyle>).parse (realStyle.checkbox ?? {}) : null,
				intermediate = realStyle?.intermediate ? (parserFactory.getParser("") as Parser<ActionElementStyle>).parse (realStyle.intermediate ?? {}) : null,
				checked = realStyle?.checked ? (parserFactory.getParser("") as Parser<ActionElementStyle>).parse (realStyle.checked ?? {}) : null;

			setCss (
				old =>
				({
					checkbox: checkbox ?? old.checkbox,
					label: label ?? old.label,
					checked: checked ?? old.checked,
					intermediate: intermediate ?? old.intermediate
				})
			);
		},
		[realStyle]
	);

	const isReallyChecked = useMemo (
		() => state === true || typeof state === "number" && state > 0,
		[state]
	);

	const full = useMemo (
		() => state === true || state === 2,
		[state]
	);
	
	return (
		<Label
			className = {className}
			$hasLabel = {label !== undefined && label !== null && label !== ""}
			onClick = {e => e.stopPropagation()}
			$css = {css.label}
		>
			<CheckBoxBox
				$isDark = {isDark}
				$colour = {colour}
				$checked = {isReallyChecked}
				$css = {css.checkbox + (isReallyChecked ? full ? css.checked : css.intermediate : "")}
			>
			{
				isReallyChecked &&
				(
					full === undefined || full ?
						checkedComponent :
						intermediateComponent
				)
			}
			</CheckBoxBox>
			<HiddenInput
				type = "checkbox"
				checked = {isReallyChecked}
				onChange = {onChange}
			/>
			{label}
		</Label>
	);
}