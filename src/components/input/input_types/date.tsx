import React, { useEffect, useRef, useState } from "react";
import DateInputProps from "../../../types/DateInputProps";
import CalendarPopup from "./calendar_popup";

export default function DateInput ({name, value, onChange, onClear, readonly, disabled, optional, withTime, validator, setIsError}: DateInputProps & {setIsError: React.Dispatch<React.SetStateAction<boolean>>})
{
	const [shownValue, setShownValue] = useState (value);
	const [isCalendarShown, setIsCalendarShown] = useState (false);


	function padDateTime (number: number)
	{
		return number.toString().padStart (2, "0");
	}

	function formatDate (date: Date)
	{
		return `${date.getFullYear().toString().padStart (4, "0")}-${padDateTime (date.getMonth() + 1)}-${padDateTime(date.getDate())}`
				+ `T${padDateTime (date.getHours())}:${padDateTime (date.getMinutes())}:${padDateTime (date.getSeconds())}`;
	}

	return (
		<>
			<input
				name = {name}
				type = {withTime ? "datetime-local" : "date"}
				value = {shownValue}
				readOnly
				onFocus = {() => setIsCalendarShown (true)}
			/>
			{
				isCalendarShown &&
					<CalendarPopup
						onChange = {newVal => setShownValue (formatDate (newVal))}
						setIsOpen = {setIsCalendarShown}
					/>
			}
		</>
	);
}