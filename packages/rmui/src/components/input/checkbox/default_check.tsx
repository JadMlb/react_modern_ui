/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useThemeColours } from "../../../styles/theme";
import { useMemo } from "react";

const Check = styled.div
`
	width: 4px;
	height: 11px;
	transform: rotate(45deg) translateX(2.5px) translateY(-3px);
`;

export default function DefaultCheck ()
{
	const getColour = useThemeColours();
	const white = useMemo (
		() => getColour ("white"),
		[getColour]
	);

	const css = useMemo (
		() => ({
			borderBottom: `3px solid ${white}`,
			borderRight: `3px solid ${white}`
		}),
		[white]
	);

	return (
		<Check css = {css}/>
	);
}