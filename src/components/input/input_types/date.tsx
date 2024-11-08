import React, { useEffect, useRef, useState } from "react";
import CalendarPopup from "./calendar_popup";
import DateTimeInputProps from "../../../types/input/datetime/DateTimeInputProps";
import TimeInputProps from "../../../types/input/datetime/TimeInputProps";
import DateInputProps from "../../../types/input/datetime/DateInputProps";
import ClearButton from "./clear_button";
import { useDarkMode, useThemeColours } from "../../../styles";

export default function DateInput (props: (DateTimeInputProps | TimeInputProps | DateInputProps) & {setIsError: React.Dispatch<React.SetStateAction<boolean>>})
{
	const {name, value, range, type, onChange, onClear, readonly, disabled, optional, validator, setIsError} = props;
	const [shownValue, setShownValue] = useState (value ? value.toString() : new Date().toString());
	const [isCalendarShown, setIsCalendarShown] = useState (false);
	const popupRef = useRef<HTMLDivElement> (null);
	const inputRef = useRef<HTMLInputElement> (null);

	const isDark = useDarkMode();
	const colour = useThemeColours();

	function onChangeDetected (newVal: Date)
	{
		const value = formatDate (newVal);
		setShownValue (value);
		if (onChange)
			onChange (value);
		if (validator)
			setIsError (!validator (newVal));
	}

	function handleClear (e: React.MouseEvent)
	{
		e.preventDefault();
		setShownValue ("");
		if (onClear)
			onClear();
	}

	function padDateTime (number: number)
	{
		return number.toString().padStart (2, "0");
	}

	function formatDate (date: Date)
	{
		const dateStr = `${date.getFullYear().toString().padStart (4, "0")}-${padDateTime (date.getMonth() + 1)}-${padDateTime(date.getDate())}`;
		const timeStr = `${padDateTime (date.getHours())}:${padDateTime (date.getMinutes())}${(props.type === "datetime" || props.type === "time") && props.withSeconds ? `:${padDateTime (date.getSeconds())}` : ""}`;

		switch (type)
		{
			case "date": return dateStr;
			case "time": return timeStr;
			case "datetime": return dateStr + "T" + timeStr;
		}
	}

	useEffect (
		() =>
		{
			function handleClickOutside (e: MouseEvent)
			{
				if (popupRef.current && inputRef.current && !popupRef.current.contains (e.target as Element) && !inputRef.current.contains (e.target as Element))
					setIsCalendarShown (false);
			}
			
			window.addEventListener ("click", handleClickOutside);

			return () => window.removeEventListener ("click", handleClickOutside);
		},
		[]
	);

	useEffect (
		() => setShownValue (value?.toString() ?? new Date().toString()),
		[value]
	);

	return (
		<>
			<input
				ref = {inputRef}
				name = {name}
				type = {type === "datetime" ? "datetime-local" : type}
				value = {shownValue}
				readOnly
				onClick = {() => setIsCalendarShown (old => !readonly && !disabled && !old)}
				min = {(range && range[0] && formatDate (range[0])) || undefined}
				max = {(range && range[1] && formatDate (range[1])) || undefined}
			/>
			{
				<CalendarPopup
					ref = {popupRef}
					onChange = {newVal => onChangeDetected (newVal)}
					isOpen = {isCalendarShown}
					setIsOpen = {setIsCalendarShown}
					type = {type}
					withSeconds = {(props.type === "datetime" || props.type === "time") && props.withSeconds}
				/>
			}
			{
				optional &&
					<ClearButton
						$isDark = {isDark}
						$colour = {colour}
						onClick = {handleClear}
					>
						&#10005;
					</ClearButton>
			}
		</>
	);
}