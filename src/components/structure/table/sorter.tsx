import React, { useState } from "react";

/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useThemeColours } from "../../../styles";
import { Colour } from "../../../types";

interface SorterProps
{
	state: "asc" | "desc" | null
	onClick: (state: "asc" | "desc" | null) => void
};

const Wrapper = styled.div
`
	min-width: 10px;
	min-height: 10px;
	
	&:hover > div
	{
		display: block;
	}
`;

const Arrow = styled.div<{$enabled: boolean, $orientation: "up" | "down", $colour: (col: Colour) => string}>
`
	display: ${props => props.$enabled ? "block" : "none"};
	width: 10px;
	height: 10px;
	border-left: 2px solid ${props => props.$colour ("white")};
	border-top: 2px solid ${props => props.$colour ("white")};
	transform: translateY(${props => (props.$orientation === "up" ? 5 : 3) * Math.sqrt (2)}px) rotate(${props => props.$orientation === "up" ? 45 : -135}deg);
`;

const STATES = [null, "asc", "desc"];

export default function Sorter ({state, onClick}: SorterProps)
{
	const [clickCount, setClickCount] = useState (0);
	const colour = useThemeColours();

	function handleClick ()
	{
		let next = (clickCount + 1) % 3;
		setClickCount (next);
		onClick (STATES[next] as "asc" | "desc" | null)
	}

	return (
		<Wrapper onClick = {handleClick}>
		{
			<Arrow
				$enabled = {state !== null}
				$orientation = {!state || state === "asc" ? "up" : "down"}
				$colour = {colour}
			/>
		}
		</Wrapper>
	);
}