import React, { useEffect, useRef, useState } from "react";
import Button from "../button";
import DraggableList, { DraggableListProps } from ".";
import { colour, radius, spacing } from "../../../styles/styles";
import { useDarkMode, useTheme } from "../../../styles/theme";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ThemeType } from "../../../types/theme";

const Container = styled.div<{$expanded: boolean, $isDark: boolean, $theme: ThemeType}>
`
	position: absolute;
	z-index: 100;
	top: 100%;
	right: 0;

	max-height: 200px;
	overflow-y: auto;

	display: ${props => props.$expanded ? "block" : "none"};
	background-color: ${props => colour (props.$isDark ? "black" : "white", props.$theme)};
	border-radius: ${radius.normal};
	box-shadow: 0 0 5px ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
	padding: ${spacing.small};
`;

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
			<Container $expanded = {isExpanded} $isDark = {isDark} $theme = {theme}>
				<DraggableList items = {items} mapper = {mapper} onChange = {onChange}/>
			</Container>
		</div>
	);
}