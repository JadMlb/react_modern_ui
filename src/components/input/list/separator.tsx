/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { ThemeColourFunction, useDarkMode, useThemeColours } from "../../../styles";

const Separator = styled.div<{$isDark: boolean, $hover: boolean, $colour: ThemeColourFunction}>
`
	height: 5px;
	width: 100%;
	${
		({$hover, $isDark, $colour}) => $hover && `background-color: ${$colour (`gray${$isDark ? "Dark" : "Light"}`)};`
	}
`;

export default function ListSeparator ()
{
	const [hover, setHover] = useState (false);
	const ref = useRef<HTMLDivElement | null> (null);

	const getColour = useThemeColours();
	const isDark = useDarkMode();

	useEffect (
		() =>
		{
			if (!ref.current)
				return;

			function detectHover (e: DragEvent)
			{
				e.preventDefault();
				setHover (true);
			}
			
			function detectHoverLeave (e: DragEvent)
			{
				e.preventDefault();
				setHover (false);
			}

			ref.current.addEventListener ("dragover", detectHover);
			ref.current.addEventListener ("dragleave", detectHoverLeave);
			ref.current.addEventListener ("drop", detectHoverLeave);

			return () =>
			{
				ref.current?.removeEventListener ("dragover", detectHover);
				ref.current?.removeEventListener ("dragleave", detectHoverLeave);
				ref.current?.removeEventListener ("drop", detectHoverLeave);
			};
		},
		[]
	);

	return (
		<Separator
			ref = {ref}
			$hover = {hover}
			$colour = {getColour}
			$isDark = {isDark}
		/>
	);
}