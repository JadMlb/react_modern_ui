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
	(instanceProps, ref) =>
	{
		const props = useProps ("input.text", instanceProps);
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
			readOnly,
			leading,
			forceMode: _,
			...rest
		} = props;
		
		const css = useStyle ("input.text", props, style);
		const fieldsetCss = useStyle ("input.text", props, fieldsetStyle, "fieldsetStyle");
		const labelCss = useStyle ("input.text", props, labelStyle, "labelStyle");
		const hintCss = useStyle ("input.text", props, hintStyle, "hintStyle");
		const errorCss = useStyle ("input.text", props, errorTextStyle, "errorTextStyle");

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
				readOnly = {readOnly}
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
					readOnly = {readOnly}
					disabled = {disabled}
					{...rest}
				/>
			</InputBase>
		);
	}
);

export default MultiLineTextInput;