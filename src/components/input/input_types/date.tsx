import React, { useCallback, useEffect, useRef, useState } from "react";
import DateTimeInputProps from "../../../types/components/input/datetime/DateTimeInputProps";
import TimeInputProps from "../../../types/components/input/datetime/TimeInputProps";
import DateInputProps from "../../../types/components/input/datetime/DateInputProps";
import InputBase from "./input_base";
import { spacing } from "../../../styles";
import X from "./combo_components/x";

export default function DateInput (props: DateTimeInputProps | TimeInputProps | DateInputProps)
{
	const {id, className, name, label, hideLabel, hint, textOnError, isError, value, range, type, leading, trailing, style, onChange, readonly, disabled, optional} = props;
	const [shownValue, setShownValue] = useState (value ? value.toString() : "");
	const popupRef = useRef<HTMLDivElement> (null);
	const inputRef = useRef<HTMLInputElement> (null);

	function handleClear (e: React.MouseEvent)
	{
		e.preventDefault();
		setShownValue ("");
		onChange?. (null, "");
	}

	function padDateTime (number: number)
	{
		return number.toString().padStart (2, "0");
	}

	const formatDate = useCallback (
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
	[]
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

	useEffect (
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

	useEffect (
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
			textOnError = {textOnError}
			label = {label}
			trailing = {
				<div style = {{display: "flex", gap: spacing.small, alignItems: "center"}}>
					{trailing}
					{optional && <X onClick = {handleClear}/>}
				</div>
			}
			isError = {isError}
			style = {style}
			onFocus = {expand}
			onBlur = {close}
			disabled = {disabled}
			readonly = {readonly}
		>
			{leading}
			<input
				ref = {inputRef}
				name = {name}
				type = {type === "datetime" ? "datetime-local" : type}
				value = {shownValue}
				onChange = {e => onChange?. (e as React.ChangeEvent<Element>, formatDate (new Date (e.target.value)))}
				min = {(range && range[0] && formatDate (range[0])) || undefined}
				max = {(range && range[1] && formatDate (range[1])) || undefined}
				style = {{all: "unset", height: "auto", font: "inherit", flex: 1}}
				disabled = {disabled}
				readOnly = {readonly}
			/>
		</InputBase>
	);
}