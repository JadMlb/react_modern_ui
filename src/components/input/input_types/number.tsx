/** @jsxImportSource @emotion/react */
import * as React from "react";
import styled from "@emotion/styled";
import { Style, ThemeColourFunction, useDarkMode, useThemeColours } from "../../../styles";
import { NumberInputProps } from "../../../types/components/input/number/NumberInputProps";
import TextInput from "./text";
import Button from "../button";

const Dash = styled.div<{$isDark: boolean, $colour: ThemeColourFunction}>
`
	position: relative;
	width: 25px;
	height: auto;
	aspect-ratio: 1 / 1;
	&:before
	{
		display: block;
		position: absolute;
		content: "";
		background-color: ${props => props.$colour (props.$isDark ? "white" : "black")};
		height: 1px;
		width: 100%;
		top: calc(50% - 0.5px);
	}
`;

const Plus = styled.div<{$isDark: boolean, $colour: ThemeColourFunction}>
`
	position: relative;
	width: 100%;
	height: auto;
	aspect-ratio: 1 / 1;
	&:before, &:after
	{
		display: block;
		position: absolute;
		content: "";
		background-color: ${props => props.$colour (props.$isDark ? "white" : "black")};
	}
	
	&:before
	{
		width: 1px;
		height: 100%;
		right: calc(50% - 0.5px);
	}

	&:after
	{
		height: 1px;
		width: 100%;
		top: calc(50% - 0.5px);
	}
`;

interface LeadingTrailingProps
{
	children?: React.ReactNode;
	disabled?: boolean;
	onChange?: () => void;
}

interface EdgeButtonProps
{
	dec?: boolean;
	disabled?: boolean;
	onChange?: () => void;
}

const EDGE_BUTTON_STYLE = {
	width: "25px",
	height: "25px",
	borderRadius: "radius.small"
} satisfies Style;

function EdgeButton ({disabled, dec, onChange}: EdgeButtonProps)
{
	const isDark = useDarkMode();
	const colour = useThemeColours();
	
	return (
		<Button
			style = {EDGE_BUTTON_STYLE}
			onClick = {!disabled ? onChange : undefined}
			disabled = {disabled}
			type = "outlined"
		>{
			dec ?
				<Dash $isDark = {isDark} $colour = {colour}/> :
				<Plus $isDark = {isDark} $colour = {colour}/>
		}</Button>
	);
}


function Leading ({disabled, children, onChange}: LeadingTrailingProps)
{
	return (
		<>
			{children}
			<EdgeButton
				onChange = {onChange}
				disabled = {disabled}
				dec
			/>
		</>
	);
}

function Trailing ({disabled, children, onChange}: LeadingTrailingProps)
{
	return (
		<>
			{children}
			<EdgeButton
				onChange = {onChange}
				disabled = {disabled}
			/>
		</>
	);
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps> (
	(props, ref) =>
	{
		const {
			id,
			className,
			name,
			label,
			labelStyle,
			placeholder,
			defaultValue,
			value,
			range,
			step,
			precision,
			hideLabel,
			hint,
			textOnError,
			leading,
			trailing,
			style,
			isError,
			autoComplete,
			autoFocus,
			form,
			onChange,
			onBlur,
			onFocus,
			onKeyDown,
			onKeyUp,
			readonly,
			disabled,
			optional
		} = props;
		const [error, setError] = React.useState (isError);
		
		const [realValue, setRealValue] = React.useState (0);
		const [shownValue, setShownValue] = React.useState ("0");

		function valueChanged (e: React.ChangeEvent | null, newVal: number)
		{
			// only update if range is undefined, or the new value respects the boundaries of the range, when provided
			if (!range || (range[0] == null || newVal >= range[0]) && (range[1] == null || newVal <= range[1]))
			{
				setRealValue (newVal);
				setShownValue (newVal.toFixed (precision));
				if (onChange)
					onChange (e, newVal);
			}
			else
				setError (true);
		}

		function handleChange (e: React.ChangeEvent | null, value: string)
		{
			e?.stopPropagation();
			e?.preventDefault();
			
			const number = +value;
			if (Number.isNaN (number))
				return;

			valueChanged (e, number);
		}

		function inc ()
		{
			valueChanged (null, realValue + (step ?? 1));
		}

		function dec ()
		{
			valueChanged (null, realValue - (step ?? 1));
		}

		React.useEffect (
			() =>
			{
				const realInitVal = value !== undefined ? value : 0;
				setRealValue (realInitVal);
				setShownValue (realInitVal.toFixed (precision));
			},
			[value]
		);
		
		return (
			<TextInput
				ref = {ref}
				id = {id}
				className = {className}
				name = {name}
				label = {label}
				type = "text"
				hint = {hint}
				isError = {error}
				textOnError = {textOnError}
				disabled = {disabled}
				hideLabel = {hideLabel}
				labelStyle = {labelStyle}
				leading = {
					<Leading onChange = {dec}>{leading}</Leading>
				}
				trailing = {
					<Trailing onChange = {inc}>{trailing}</Trailing>
				}
				onChange = {handleChange}
				optional = {optional}
				readonly = {readonly}
				style = {{...style, width: "fit-content"}}
				defaultValue = {defaultValue}
				value = {shownValue}
				placeholder = {placeholder}
				autoComplete = {autoComplete}
				autoFocus = {autoFocus}
				form = {form}
				onBlur = {onBlur}
				onFocus = {onFocus}
				onKeyDown = {onKeyDown}
				onKeyUp = {onKeyUp}
			/>
		);
	}
);

export default NumberInput;