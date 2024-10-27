import React, { useEffect, useRef, useState } from "react";
import CalendarPopup from "./calendar_popup";
import DateTimeInputProps from "../../../types/DateTimeInputProps";
import TimeInputProps from "../../../types/TimeInputProps";
import DateInputProps from "../../../types/DateInputProps";
import CalendarPopup from "./calendar_popup";

export default function DateInput (props: (DateTimeInputProps | TimeInputProps | DateInputProps) & {setIsError: React.Dispatch<React.SetStateAction<boolean>>})
{
	const {name, value, type, onChange, onClear, readonly, disabled, optional, validator, setIsError} = props;
	const [shownValue, setShownValue] = useState (value.toString());
	const [isCalendarShown, setIsCalendarShown] = useState (false);
	const popupRef = useRef<HTMLDivElement> (null);
	const inputRef = useRef<HTMLInputElement> (null);

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

	return (
		<>
			<input
				ref = {inputRef}
				name = {name}
				type = {type === "datetime" ? "datetime-local" : type}
				value = {shownValue}
				readOnly
				onClick = {() => setIsCalendarShown (old => !old)}
			/>
			{
				<CalendarPopup
					ref = {popupRef}
					onChange = {newVal => setShownValue (formatDate (newVal))}
					isOpen = {isCalendarShown}
					setIsOpen = {setIsCalendarShown}
					type = {type}
					withSeconds = {(props.type === "datetime" || props.type === "time") && props.withSeconds}
				/>
			}
		</>
	);
}