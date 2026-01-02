/** @jsxImportSource @emotion/react */
import * as React from "react";
import styled from "@emotion/styled";
import useProps from "../../../../hooks/useProps";
import InputBase from "../input_base";
import MultiLineTextInputProps from "../../../../types/components/input/text/MultiLineTextInputProps";
import useStyle from "../../../../hooks/useStyle";
import TextInputTrailing from "./trailing";

const StyledTextArea = styled.textarea
`
	all: unset;
	font: inherit;
	width: 100%;
	resize: vertical;
`;

const MultiLineTextInput = React.forwardRef<HTMLTextAreaElement, MultiLineTextInputProps> (
	(props, ref) =>
	{
		const {
			type,
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
		} = useProps ("input.text", props);
		
		const css = useStyle ("input.text", style);
		const fieldsetCss = useStyle ("input.text", fieldsetStyle, undefined, "fieldsetStyle");
		const labelCss = useStyle ("input.text", labelStyle, undefined, "labelStyle");
		const hintCss = useStyle ("input.text", hintStyle, undefined, "hintStyle");
		const errorCss = useStyle ("input.text", errorTextStyle, undefined, "errorTextStyle");

		const [shownValue, setShownValue] = React.useState (props.value ?? "");

		const inputRef = React.useRef<HTMLTextAreaElement> (null);
		React.useImperativeHandle (
			ref,
			() => inputRef.current!
		);

		function handleChange (e: React.ChangeEvent<HTMLTextAreaElement>)
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
				label = {label}
				labelStyle = {labelCss}
				errorTextStyle = {errorCss}
				trailing = {
					<TextInputTrailing
						type = {type}
						displayType = {"text"}
						handleDisplayChange = {() => {}}
						optional = {optional}
						handleClear = {handleClear}
						maxCharCount = {maxLength}
						shownValue = {shownValue}
						displayLength = {displayLength}
						multiline
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
				<StyledTextArea
					ref = {inputRef}
					id = {`${name}-${type}-input`}
					name = {name}
					value = {shownValue}
					onChange = {handleChange}
					maxLength = {maxLength}
					autoCorrect = {props.type === "text" ? props.autoCorrect : undefined}
					readOnly = {readonly}
					disabled = {disabled}
					{...rest}
				/>
			</InputBase>
		);
	}
);

export default MultiLineTextInput;