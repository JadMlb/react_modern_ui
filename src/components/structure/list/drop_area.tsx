/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { StaticStyle } from "../../../types";

interface ListDropAreaProps
{
	style?: StaticStyle;
}

export default function ListDropArea ({style}: ListDropAreaProps)
{
	const [hover, setHover] = useState (false);
	const ref = useRef<HTMLDivElement | null> (null);

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
			css = {style}
			className = {hover ? "rmui-list-drop-area-hovered" : undefined}
		/>
	);
}