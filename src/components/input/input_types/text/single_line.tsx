/** @jsxImportSource @emotion/react */
import * as React from "react";
import styled from "@emotion/styled";
import SingleLineTextInputProps from "../../../../types/components/input/text/SingleLineTextInputProps";
import useProps from "../../../../hooks/useProps";
import InputBase from "../input_base";
import NonTextTextualInputProps from "../../../../types/components/input/text/NonTextTextualInputProps";
import useStyle from "../../../../hooks/useStyle";
import TextInputTrailing from "./trailing";

const StyledTextInput = styled.input
`
	all: unset;
	font: inherit;
	width: 100%;
`;

const SingleLineTextInput = React.forwardRef<HTMLInputElement, SingleLineTextInputProps | NonTextTextualInputProps> (
	(props, ref) =>
	{
		const type = props.type;
		const {
			type: _,
			pattern,
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
			maxLength,
			displayLength,
			trailing,
			isError,
			style,
			fieldsetStyle,
			disabled,
			readonly,
			leading,
			...rest
		} = useProps (`input.${type}`, props);

		const css = useStyle (`input.${type}`, style);
		const fieldsetCss = useStyle (`input.${type}`, fieldsetStyle, undefined, "fieldsetStyle");
		const labelCss = useStyle (`input.${type}`, labelStyle, undefined, "labelStyle");
		const hintCss = useStyle (`input.${type}`, hintStyle, undefined, "hintStyle");
		const errorCss = useStyle (`input.${type}`, errorTextStyle, undefined, "errorTextStyle");

		const [shownValue, setShownValue] = React.useState (props.value ?? "");
		const [displayType, setDisplayType] = React.useState (type);

		const inputRef = React.useRef<HTMLInputElement> (null);
		React.useImperativeHandle (
			ref,
			() => inputRef.current!
		);

		function handleChange (e: React.ChangeEvent<HTMLInputElement>)
		{
			try
			{	
				if (type !== "text" && pattern)
				{
					const regex = new RegExp (pattern);
					if (!regex.test (e.target.value))
						return;
				};

				if (!props.value)
					setShownValue (e.target.value);
				if (onChange)
					onChange (e, e.target.value);
			}
			catch {}
		}

		function handleClear ()
		{
			setShownValue ("");
			onChange?. (null, "");
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

		React.useEffect (
			() => {setShownValue (props.value ?? "")},
			[props.value]
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
					<TextInputTrailing
						type = {type}
						displayType = {displayType}
						handleDisplayChange = {() => setDisplayType (old => old === "password" ? "text" : "password")}
						optional = {optional}
						handleClear = {handleClear}
						maxCharCount = {maxLength}
						shownValue = {shownValue}
						displayLength = {displayLength}
					>
						{trailing}
					</TextInputTrailing>
				}
				isError = {isError}
				style = {css}
				fieldsetStyle = {fieldsetCss}
				disabled = {disabled}
				readonly = {readonly}
				onClick = {handleClick}
				onFocus = {handleFocus}
				onBlur = {handleBlur}
			>
				{leading}
				<StyledTextInput
					ref = {inputRef}
					id = {`${name}-${type}-input`}
					name = {name}
					type = {displayType}
					value = {shownValue}
					onChange = {handleChange}
					maxLength = {maxLength}
					pattern = {pattern}
					autoCorrect = {props.type === "text" ? props.autoCorrect : undefined}
					readOnly = {readonly}
					disabled = {disabled}
					{...rest}
				/>
			</InputBase>
		);
	}
);

export default SingleLineTextInput;