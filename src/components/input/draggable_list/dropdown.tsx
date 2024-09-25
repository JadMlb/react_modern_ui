import React, { useEffect, useRef, useState } from "react";
import Button from "../button";
import DraggableList, { DraggableListProps } from ".";
import { colour, radius } from "../../../styles/styles";
import { useDarkMode, useTheme } from "../../../styles/theme";
import "./list.css";

type DropDownDraggableListProps = {
	label: string
} & DraggableListProps

export default function DropDownDraggableList ({label, items, mapper, onChange}: DropDownDraggableListProps)
{
	const [isExpanded, setIsExpanded] = useState (false);
	const buttonRef = useRef<HTMLDivElement> (null);
	const isDark = useDarkMode();
	const {theme} = useTheme();

	useEffect (
		() =>
		{
			function handleClickOutsideSelect (e: MouseEvent)
			{
				if (buttonRef.current && !buttonRef.current.contains (e.target as Element))
					setIsExpanded (false);
			}

			window.addEventListener ("click", handleClickOutsideSelect);

			return () => window.removeEventListener ("click", handleClickOutsideSelect);
		}
	);

	return (
		<div ref = {buttonRef} style = {{position: "relative"}}>
			<Button onClick = {() => setIsExpanded (old => !old)}>{label}</Button>	
			<div
				className = "draggable-list-dropdown-container"
				style = {{
					display: isExpanded ? "block" : "none",
					backgroundColor: colour (isDark ? "black" : "white", theme),
					borderRadius: radius.normal,
					boxShadow: `0 0 5px ${colour (isDark ? "grayDark" : "grayLight", theme)}`,
				}}
			>
				<DraggableList items = {items} mapper = {mapper} onChange = {onChange}/>
			</div>
		</div>
	);
}