/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { ThemeColourFunction, useDarkMode, useThemeColours } from "../../../styles";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled.div<{$dragging: boolean}>
`
	width: 5px;
	height: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-contents: center;
	gap: 3px;
	cursor: grab${({$dragging}) => $dragging && "bing"};
`;

const DotBase = styled.div<{$isDark: boolean, $colour: ThemeColourFunction}>
`
	width: 3px;
	height: 3px;
	border-radius: 100%;
	cusror: drag;
	background-color: ${({$isDark, $colour}) => $colour ($isDark ? "white" : "black")};
`;

function Dot ()
{
	const getColour = useThemeColours();
	const isDark = useDarkMode();

	return (
		<DotBase $isDark = {isDark} $colour = {getColour}/>
	);
}

export default function DefaultDragHandle ()
{
	const [isDragging, setIsDragging] = useState (false);
	const ref = useRef<HTMLDivElement | null> (null);

	useEffect (
		() =>
		{
			if (!ref.current)
				return;

			function handleDragStart (e: DragEvent)
			{
				e.preventDefault();
				setIsDragging (true);
			}
			
			function handleDragEnd (e: DragEvent)
			{
				e.preventDefault();
				setIsDragging (false);
			}

			ref.current.addEventListener ("dragstart", handleDragStart);
			ref.current.addEventListener ("dragend", handleDragEnd);
			
			return () =>
			{
				if (!ref.current)
					return;

				ref.current.removeEventListener ("dragstart", handleDragStart);
				ref.current.removeEventListener ("dragend", handleDragEnd);
			}
		},
		[setIsDragging]
	);
	
	return (
		<Wrapper $dragging = {isDragging} ref = {ref}>
			<Dot/>
			<Dot/>
			<Dot/>
		</Wrapper>
	);
}