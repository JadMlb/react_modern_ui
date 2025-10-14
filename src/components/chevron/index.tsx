/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useThemeParser } from "../../styles";
import { useMemo } from "react";

const ChevronArrow = styled.div<{$orientation?: "up" | "down" | "right" | "left"}>
`
	width: 10px;
	height: 10px;
	transform: rotate(${
		props => props.$orientation === "up" ? -135 :
				props.$orientation === "down" ? 45 :
				props.$orientation === "left" ? 135 :
				-45
	}deg) translate(-2.5px, -2.5px);
`;

interface ChevronProps
{
	orientation?: "up" | "down" | "right" | "left";
	inline?: boolean;
	inactive?: boolean;
}

export default function Chevron ({orientation = "up", inline, inactive}: ChevronProps)
{
	const parseCss = useThemeParser();

	const borders = useMemo (
		() => parseCss ({
			borderBottom: `2px solid ${inline ? inactive ? "gray" : "black" : "primary"}`,
			borderRight: `2px solid ${inline ? inactive ? "gray" : "black" : "primary"}`
		}),
		[parseCss, inline, inactive]
	);

	return (
		<ChevronArrow css = {borders} $orientation = {orientation}/>
	);
}