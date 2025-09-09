/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useThemeParser } from "../../styles";
import { useMemo } from "react";

const ChevronArrow = styled.div<{$up?: boolean}>
`
	width: 10px;
	height: 10px;
	transform: rotate(${props => props.$up ? -135 : 45}deg) translate(-2.5px, -2.5px);
`;

interface ChevronProps
{
	up?: boolean;
	inline?: boolean;
	inactive?: boolean;
}

export default function Chevron ({up, inline, inactive}: ChevronProps)
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
		<ChevronArrow css = {borders} $up = {up}/>
	);
}