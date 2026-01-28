/** @jsxImportSource @emotion/react */
import * as React from "react";
import { NumberInputProps } from "../../../../types";
import useProps from "../../../../hooks/useProps";
import useStyle from "../../../../hooks/useStyle";
import InputBase from "../input_base";
import styled from "@emotion/styled";
import NumberInputLeading from "./leading";
import NumberInputTrailing from "./trailing";

const StyledInput = styled.input
`
	all: unset;
	font: inherit;
	width: 100%;
	-moz-appearance: textfield;
	
	&::-webkit-outer-spin-button, &::-webkit-inner-spin-button
	{
		-webkit-appearance: none;
		margin: 0;
	}
`;

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps> (
	(instanceProps, ref) =>
	{
		const props = useProps ("input.number", instanceProps);
		const {
			value,
			type,
			onChange,
			id,
			className,
			name,
			hideLabel,
			hint,
			hintStyle,
			textOnError,
			errorTextStyle,
			label,
			labelStyle,
			optional,
			trailing,
			isError,
			style,
			fieldsetStyle,
			disabled,
			readOnly,
			leading,
			range,
			precision,
			step,
			...rest
		} = props;
		const css = useStyle ("input.number", props, style);
		const fieldsetCss = useStyle ("input.number", props, fieldsetStyle, "fieldsetStyle");
		const labelCss = useStyle ("input.number", props, labelStyle, "labelStyle");
		const hintCss = useStyle ("input.number", props, hintStyle, "hintStyle");
		const errorCss = useStyle ("input.number", props, errorTextStyle, "errorTextStyle");
		
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

		function handleChange (e: React.ChangeEvent<HTMLInputElement>)
		{
			e?.stopPropagation();
			e?.preventDefault();
			
			const number = +e.target.value;
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

		const inputRef = React.useRef<HTMLInputElement> (null);
		React.useImperativeHandle (
			ref,
			() => inputRef.current!
		);
		
		function handleClear ()
		{
			setShownValue ("");
			onChange?. (null, 0);
		}

		function handleFocus ()
		{
			inputRef.current?.focus();
		}
		
		function handleBlur ()
		{
			inputRef.current?.blur();
		}
		
		function handleClick ()
		{
			inputRef.current?.click();
		}

		const handleWheel = React.useCallback (
			(e: React.WheelEvent<HTMLInputElement>) =>
			{
				e.currentTarget.blur();
			},
			[]
		);
		
		return (
			<InputBase
				id = {id}
				className = {className}
				inputId = {`${name}-${type}-input`}
				hideLabel = {hideLabel}
				hint = {hint}
				hintStyle = {hintCss}
				textOnError = {textOnError}
				errorTextStyle = {errorCss}
				label = {label}
				labelStyle = {labelCss}
				trailing = {
					<NumberInputTrailing
						disabled = {disabled}
						onChange = {inc}
						handleClear = {handleClear}
						optional = {optional}
					>
						{trailing}
					</NumberInputTrailing>
				}
				isError = {error}
				style = {css}
				fieldsetStyle = {fieldsetCss}
				disabled = {disabled}
				readOnly = {readOnly}
				onClick = {handleClick}
				onFocus = {handleFocus}
				onBlur = {handleBlur}
			>
				<NumberInputLeading
					disabled = {disabled}
					onChange = {dec}
				>
					{leading}
				</NumberInputLeading>
				<StyledInput
					ref = {inputRef}
					id = {`${name}-${type}-input`}
					name = {name}
					type = {type}
					value = {shownValue}
					onChange = {handleChange}
					readOnly = {readOnly}
					disabled = {disabled}
					onWheel = {handleWheel}
					{...rest}
				/>
			</InputBase>
		);
	}
);

export default NumberInput;