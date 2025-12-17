/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useRef, useState } from "react";
import useStyle from "../../../hooks/useStyle";
import { Style } from "../../../types";

interface ListDropAreaProps
{
	style?: Style;
}

export default function ListDropArea ({style}: ListDropAreaProps)
{
	const [hover, setHover] = useState (false);
	const ref = useRef<HTMLDivElement | null> (null);

	const injectedStyles = useCallback (
		(isDark: boolean) => ({
			backgroundColor: hover ? `gray${isDark ? "Dark" : "Light"}` : "transparent"
		}),
		[hover]
	);

	const css = useStyle ("list", style, injectedStyles, "listItemDropAreaStyle");

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
		<div
			ref = {ref}
			css = {css}
		/>
	);
}