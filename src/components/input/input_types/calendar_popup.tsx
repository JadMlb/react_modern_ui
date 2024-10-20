import React, { useEffect, useMemo, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Colour } from "../../../types";
import { useDarkMode, useThemeColours } from "../../../styles/theme";
import { radius, spacing } from "../../../styles/styles";
import Button from "../button";

const Popup = styled.div<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	position: absolute;
	top: 100%;

	cursor: default;

	background-color: ${props => props.$colour (props.$isDark ? "grayDark" : "grayLight")};
	border-radius: ${radius.normal};
	box-shadow: 0 0 10px ${props => props.$colour ("gray")};

	padding: ${spacing.normal};

	display: flex;
	gap: ${spacing.small};
`;

const CalendarHeaderCell = styled.div<{$colour: (col: Colour) => string}>
`
	font-size: 0.6em;
	font-weight: bold;
	border-bottom: 1px solid ${props => props.$colour ("gray")};
`;

const CalendarCell = styled.div<{$today?: boolean, $selected?: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	border-radius: ${radius.normal};
	cursor: pointer;
	${props => props.$today && `background-color: ${props.$colour (props.$isDark ? "primaryDark" : "primaryElevated")};`}
	${props => props.$selected && `background-color: ${props.$colour ("primary")}; color: ${props.$colour ("white")};`}
`;

const CalendarHeader = styled.div
`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`;

const CalendarBody = styled.div
`
	display: grid;
	grid-template-columns: repeat(7, 1fr);

	div
	{
		padding: ${spacing.xsmall};
		width: 25px;
		text-align: center;
	}
`;

type CalendarPopupProps = {
	value?: Date | string,
	withTime?: boolean,
	onChange?: (newDate: Date) => void,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export default function CalendarPopup ({value, withTime, onChange, setIsOpen}: CalendarPopupProps)
{
	const isDark = useDarkMode();
	const colour = useThemeColours();
	
	const popupRef = useRef<HTMLDivElement> (null);
	
	const TODAY = new Date();
	// use the locale to get the names of the days
	// jan 2024 started on a monday
	const DAYS = new Array(7).fill(0).map (
		(_, i) =>
		{
			const date = new Date (2024, 0, i + 1);
			return date.toString().split(" ")[0];
		}
	);
	
	const [selectedValue, setSelectedValue] = useState<Date> (value ? new Date (value) : TODAY);
	const FIRST_DAY = useMemo (
		() => (new Date(selectedValue.getFullYear(), selectedValue.getMonth(), 1).getDay() + 6) % 7, // by default sunday is @ index 0 => shift the numbers so that monday is at index 0
		[selectedValue]
	);
	const DAYS_IN_MONTH = useMemo (
		() => new Date(selectedValue.getFullYear(), selectedValue.getMonth() + 1, 0).getDate(),
		[selectedValue]
	);
	const currentMonth = useMemo (
		() => selectedValue.toString().split(" ")[1],
		[selectedValue.getMonth()]
	);

	function isToday (day: number)
	{
		return selectedValue.getFullYear() === TODAY.getFullYear() && selectedValue.getMonth() === TODAY.getMonth() && day === TODAY.getDate();
	}

	function changeMonth (previous?: boolean)
	{
		const oldMonth = selectedValue.getMonth();
		let newMonth = previous ? oldMonth - 1 : oldMonth + 1;
		let newYear = selectedValue.getFullYear();
		
		if (newMonth < 0)
		{
			newYear--;
			newMonth = 11;
		}
		else if (newMonth > 11)
		{
			newYear++;
			newMonth = 0;
		}

		const newValue = new Date (newYear, newMonth, selectedValue.getDate());
		
		setSelectedValue (newValue);

		if (onChange)
			onChange (newValue);
	}

	function changeDate (newDate: number)
	{
		const newVal = new Date (selectedValue.getFullYear(), selectedValue.getMonth(), newDate);
		setSelectedValue (newVal);

		if (onChange)
			onChange (newVal);
		setIsOpen (false);
	}

	function reset ()
	{
		setSelectedValue (TODAY);

		if (onChange)
			onChange (TODAY);
		setIsOpen (false);
	}

	useEffect (
		() =>
		{
			function handleClickOutside (e: MouseEvent)
			{
				if (popupRef.current && !popupRef.current.contains (e.target as Element))
					setIsOpen (false);
			}

			window.addEventListener ("click", handleClickOutside);

			return () => window.removeEventListener ("click", handleClickOutside);
		},
		[]
	);
	
	return (
		<Popup $isDark = {isDark} $colour = {colour}>
			<div>
				<CalendarHeader>
					<Button rounded onClick = {() => changeMonth (true)}>&lt;</Button>
					<span>{currentMonth} {selectedValue.getFullYear()}</span>
					<Button onClick = {reset}><span style = {{fontSize: "smaller"}}>Today</span></Button>
					<Button rounded onClick = {() => changeMonth()}>&gt;</Button>
				</CalendarHeader>
				<CalendarBody>
					{DAYS.map (day => <CalendarHeaderCell $colour = {colour}>{day}</CalendarHeaderCell>)}
					{
						new Array(DAYS_IN_MONTH + FIRST_DAY).fill(0).map (
							(_, day) =>
							{
								const val = day - FIRST_DAY + 1;
								return <CalendarCell
											$today = {isToday (val)}
											$selected = {val === selectedValue.getDate()}
											$isDark = {isDark}
											$colour = {colour}
											onClick = {val > 0 ? () => changeDate (val) : undefined}
										>
											{val > 0 && `${val}`}
										</CalendarCell>
							}
						)
					}
				</CalendarBody>
			</div>
			{
				withTime &&
					<div>
						<div></div>
						<div></div>
						<div></div>
					</div>
			}
		</Popup>
	);
}