/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useThemeColours } from "../../../styles";
import { useMemo } from "react";

const Dash = styled.div
`
	width: 12px;
	height: 3px;
	margin: 6.5px 2.5px;
`;

export default function DefaultIntermediate ()
{
	const getColour = useThemeColours();
	const white = useMemo (
		() => getColour ("white"),
		[getColour]
	);

	const css = useMemo (
		() => ({
			backgroundColor: white,
		}),
		[white]
	);

	return (
		<Dash css = {css}/>
	);
}