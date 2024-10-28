import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Colour, Option } from "../../../types";
import { useDarkMode, useThemeColours } from "../../../styles/theme";
import { radius, spacing } from "../../../styles/styles";
import Button from "../button";
import ComboBox from "../combobox";
import NewInput from "../input-new";

const Popup = styled.div<{$isShown: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	display: ${props => props.$isShown ? "flex" : "none"};
	position: absolute;
	top: 100%;

	cursor: default;

	background-color: ${props => props.$colour (props.$isDark ? "grayDark" : "grayLight")};
	border-radius: ${radius.normal};
	box-shadow: 0 0 10px ${props => props.$colour ("gray")};

	padding: ${spacing.normal};

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

const TimePicker = styled.div<{$height: number}>
`
	max-height: calc(${props => props.$height} * 30px + 2 * ${spacing.xsmall});
	overflow: auto;

	&::-webkit-scrollbar
	{
		display: none;
	}
	overflow: -moz-scrollbars-none;
	-ms-overflow-style: none;

	padding: ${spacing.xsmall};

	text-align: center;

	div
	{
		width: 30px;
		height: 30px;

		display: grid;
		align-items: center;
	}
`;

const MonthYearPicker = styled.span
`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	align-items: center;
`;

type CalendarPopupProps = {
	value?: Date | string,
	type: "date" | "datetime" | "time",
	withSeconds?: boolean,
	onChange?: (newDate: Date) => void,
	isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const CalendarPopup = forwardRef<HTMLDivElement, CalendarPopupProps> (
	({value, type, withSeconds, onChange, isOpen, setIsOpen}: CalendarPopupProps, ref) =>
	{
		const isDark = useDarkMode();
		const colour = useThemeColours();
		
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
		const MONTHS: Option[] = Array.from ({length: 12}, (_, i) => i)
						.map (
							m =>
							{
								let date = new Date (2024, m, 1);
								return {id: m, text: date.toString().split(" ")[1]};
							}
						);

		const nbRows = useMemo (
			() => Math.ceil ((FIRST_DAY + DAYS_IN_MONTH) / 7) + 2,
			[FIRST_DAY, DAYS_IN_MONTH]
		);

		const uses12hFormat = useMemo (
			() => Intl.DateTimeFormat(navigator.language, {hour: "numeric"}).resolvedOptions().hour12,
			[navigator.language]
		);

		const hoursPickerRef = useRef<HTMLDivElement> (null);
		const minutesPickerRef = useRef<HTMLDivElement> (null);
		const secondsPickerRef = useRef<HTMLDivElement> (null);

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
		
		function setMonth (month: number)
		{
			const newValue = new Date (selectedValue.getFullYear(), month, selectedValue.getDate());
			
			setSelectedValue (newValue);

			if (onChange)
				onChange (newValue);
		}
		
		function setYear (year: number)
		{
			const newValue = new Date (year, selectedValue.getMonth(), selectedValue.getDate());
			
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

		function toggleAmPm (type: "a" | "p")
		{
			const newVal = new Date (selectedValue);
			const needsChange = type === "a" && selectedValue.getHours() >= 12 || type === "p" && selectedValue.getHours() < 12
			
			if (needsChange)
				newVal.setHours ((selectedValue.getHours() + 12) % 24);
			setSelectedValue (newVal);

			if (onChange)
				onChange (newVal);
			setIsOpen (false);
		}

		function setTime (value: number, part: "h" | "m" | "s")
		{
			const newDateValue = new Date (selectedValue);
			const isPm = selectedValue.getHours() >= 12;
			switch (part)
			{
				case "h":
					let val = value;
					if (uses12hFormat)
					{
						if (val === 12 && !isPm)
							val = 0;
						else if (isPm && val !== 12)
							val += 12;
					}
					newDateValue.setHours (val);
					break;
				case "m":
					newDateValue.setMinutes (value);
					break;
				case "s":
					newDateValue.setSeconds (value);
					break;
			}

			setSelectedValue (newDateValue);
			if (onChange)
				onChange (newDateValue);
			setIsOpen (false);
		}

		function reset ()
		{
			setSelectedValue (TODAY);

			if (onChange)
				onChange (TODAY);
			setIsOpen (false);
		}

		function isSameHour (value: number)
		{
			return uses12hFormat ? (selectedValue.getHours() % 12 || 12) === value : selectedValue.getHours() === value;
		}

		useEffect (
			() =>
			{
				const padding = +spacing.normal.substring(0, spacing.normal.length - 2) + +spacing.xsmall.substring(0, spacing.xsmall.length - 2);
				
				if (hoursPickerRef.current)
				{
					const expectedSelectedValue = uses12hFormat ? (selectedValue.getHours() % 12 || 12) : selectedValue.getHours();
					const selected = Array.from(hoursPickerRef.current.children).filter (child => expectedSelectedValue === +child.innerHTML);
					
					if (selected.length > 0)
					{
						const selectedElem = selected[0];
						const {offsetTop} = selectedElem as HTMLDivElement;

						hoursPickerRef.current.scrollTo ({top: offsetTop - padding, behavior: "smooth"});
					}
				}
				
				if (minutesPickerRef.current)
				{
					const selected = Array.from(minutesPickerRef.current.children).filter (child => selectedValue.getMinutes() === +child.innerHTML);
					
					if (selected.length > 0)
					{
						const selectedElem = selected[0];
						const {offsetTop} = selectedElem as HTMLDivElement;

						minutesPickerRef.current.scrollTo ({top: offsetTop - padding, behavior: "smooth"});
					}
				}
				
				if (secondsPickerRef.current)
				{
					const selected = Array.from(secondsPickerRef.current.children).filter (child => selectedValue.getSeconds() === +child.innerHTML);
					
					if (selected.length > 0)
					{
						const selectedElem = selected[0];
						const {offsetTop} = selectedElem as HTMLDivElement;

						secondsPickerRef.current.scrollTo ({top: offsetTop - padding, behavior: "smooth"});
					}
				}
			},
			[selectedValue, hoursPickerRef.current, minutesPickerRef.current, secondsPickerRef.current]
		);
		
		return (
			<Popup $isShown = {isOpen} $isDark = {isDark} $colour = {colour} ref = {ref}>
				{
					["datetime", "date"].includes (type) &&
						<div>
							<CalendarHeader>
								<Button rounded onClick = {() => changeMonth (true)}>&lt;</Button>
								<MonthYearPicker>
									<ComboBox
										name = "month"
										from = {MONTHS}
										values = {[selectedValue.getMonth()]}
										onChange = {options => {if (options[0]) setMonth (options[0].id)}}
										compact
										notSearchable
										required
									/>
									<NewInput
										type = "number"
										name = "year"
										value = {selectedValue.getFullYear()}
										range = {[1970, null]}
										onChange = {year => setYear (year)}
										noLabel
									/>
								</MonthYearPicker>
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
				}
				{
					["datetime", "time"].includes (type) &&
						<>
							<TimePicker $height = {nbRows} ref = {hoursPickerRef}>
							{
								new Array(uses12hFormat ? 12 : 24).fill(0).map (
									(_, h) =>
									{
										const val = uses12hFormat ? h + 1 : h;
										return <CalendarCell
													$isDark = {isDark}
													$colour = {colour}
													onClick = {() => setTime (val, "h")}
													$selected = {isSameHour (val)}
												>
													{val}
												</CalendarCell>
									}
								)
							}
							</TimePicker>
							<TimePicker $height = {nbRows} ref = {minutesPickerRef}>
							{
								new Array(60).fill(0).map (
									(_, h) => <CalendarCell
													$isDark = {isDark}
													$colour = {colour}
													onClick = {() => setTime (h, "m")}
													$selected = {selectedValue.getMinutes() === h}
												>
													{h}
												</CalendarCell>
								)
							}
							</TimePicker>
							{
								withSeconds &&
									<TimePicker $height = {nbRows} ref = {secondsPickerRef}>
									{
										new Array(60).fill(0).map (
											(_, s) => <CalendarCell
														$isDark = {isDark}
														$colour = {colour}
														onClick = {() => setTime (s, "s")}
														$selected = {s === selectedValue.getSeconds()}
													>
														{s}
													</CalendarCell>
										)
									}
									</TimePicker>
							}
							{
								uses12hFormat &&
									<TimePicker $height = {nbRows}>
										<CalendarCell
											$isDark = {isDark}
											$colour = {colour}
											onClick = {() => toggleAmPm ("a")}
											$selected = {selectedValue.getHours() < 12}
										>
											AM
										</CalendarCell>
										<CalendarCell
											$isDark = {isDark}
											$colour = {colour}
											onClick = {() => toggleAmPm ("p")}
											$selected = {selectedValue.getHours() >= 12}
										>
											PM
										</CalendarCell>
									</TimePicker>
							}
						</>
				}
			</Popup>
		);
	}
)

export default CalendarPopup;