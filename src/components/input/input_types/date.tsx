import * as React from "react";
import DateTimeInputProps from "../../../types/components/input/datetime/DateTimeInputProps";
import TimeInputProps from "../../../types/components/input/datetime/TimeInputProps";
import DateInputProps from "../../../types/components/input/datetime/DateInputProps";
import InputBase from "./input_base";
import useProps from "../../../hooks/useProps";
import Trailing from "./trailing/trailing";
import styled from "@emotion/styled";
import useStyle from "../../../hooks/useStyle";

function padDateTime (number: number)
{
	return number.toString().padStart (2, "0");
}

const Input = styled.input
`
	all: unset;
	height: auto;
	font: inherit;
	flex: 1;
`;

const DateInput = React.forwardRef<HTMLInputElement, DateTimeInputProps | TimeInputProps | DateInputProps> (
	(instanceProps, ref) =>
	{
		const type = instanceProps.type;
		const props = useProps (`input.${type}`, instanceProps);
		const {
			type: _,
			id,
			name,
			className,
			hideLabel,
			hint,
			textOnError,
			label,
			labelStyle,
			value,
			onChange,
			range,
			isError,
			leading,
			trailing,
			style,
			optional,
			disabled,
			readonly,
			fieldsetStyle,
			hintStyle,
			errorTextStyle,
			...rest
		} = props;
		
		const css = useStyle (`input.${type}`, props, style);
		const fieldsetCss = useStyle (`input.${type}`, props, fieldsetStyle, "fieldsetStyle");
		const labelCss = useStyle (`input.${type}`, props, labelStyle, "labelStyle");
		const hintCss = useStyle (`input.${type}`, props, hintStyle, "hintStyle");
		const errorCss = useStyle (`input.${type}`, props, errorTextStyle, "errorTextStyle");
		
		const [shownValue, setShownValue] = React.useState (value ? value.toString() : "");
		const popupRef = React.useRef<HTMLDivElement> (null);
		const inputRef = React.useRef<HTMLInputElement> (null);
		
		React.useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null> (ref, () => inputRef.current);

		function handleClear ()
		{
			setShownValue ("");
			onChange?. (null, "");
		}

		const formatDate = React.useCallback (
			(date: Date) =>
			{
				const dateStr = `${date.getFullYear().toString().padStart (4, "0")}-${padDateTime (date.getMonth() + 1)}-${padDateTime(date.getDate())}`;
				const timeStr = `${padDateTime (date.getHours())}:${padDateTime (date.getMinutes())}${(props.type === "datetime" || props.type === "time") && props.withSeconds ? `:${padDateTime (date.getSeconds())}` : ""}`;

				switch (type)
				{
					case "date": return dateStr;
					case "time": return timeStr;
					case "datetime": return dateStr + " " + timeStr;
				}
			},
			[type, (props.type === "datetime" || props.type === "time") && props.withSeconds]
		)

		function expand (e: React.FocusEvent)
		{
			e.stopPropagation();
			if (!disabled && !readonly)
			{
				inputRef.current?.showPicker?.();
				inputRef.current?.click();
			}
		}

		function close (e: React.FocusEvent)
		{
			e.stopPropagation();
			inputRef.current?.blur();
		}

		React.useEffect (
			() =>
			{
				function handleClickOutside (e: MouseEvent)
				{
					if (popupRef.current && inputRef.current && !popupRef.current.contains (e.target as Element) && !inputRef.current.contains (e.target as Element))
						inputRef.current?.blur();
				}
				
				window.addEventListener ("click", handleClickOutside);

				return () => window.removeEventListener ("click", handleClickOutside);
			},
			[]
		);

		React.useEffect (
			() => setShownValue (value?.toString() ?? ""),
			[value]
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
					<Trailing
						optional = {optional}
						handleClear = {handleClear}
					>
						{trailing}
					</Trailing>
				}
				isError = {isError}
				style = {css}
				fieldsetStyle = {fieldsetCss}
				onFocus = {expand}
				onBlur = {close}
				disabled = {disabled}
				readonly = {readonly}
			>
				{leading}
				<Input
					ref = {inputRef}
					type = {type === "datetime" ? "datetime-local" : type}
					value = {shownValue}
					onChange = {e => onChange?. (e as React.ChangeEvent<Element>, formatDate (new Date (e.target.value)))}
					min = {(range && range[0] && formatDate (range[0])) || undefined}
					max = {(range && range[1] && formatDate (range[1])) || undefined}
					disabled = {disabled}
					readOnly = {readonly}
					{...rest}
				/>
			</InputBase>
		);
	}
);

export default DateInput;