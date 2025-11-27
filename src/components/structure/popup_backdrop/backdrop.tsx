import { useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { Style, useThemeParser } from "../../../styles";
import PopupBackdropProps from "../../../types/components/Popups/PopupBackdropProps";

const DEFAULT_STYLE = {
	position: "absolute",
	zIndex: 100000,
	top: 0,
	left: 0,
	width: "100dvw",
	height: "100dvh",
	backgroundColor: "color(from black srgb r g b / 0.5)",
	backdropFilter: "blur(10px)",
	display: "flex",
	alignItems: "center"
} satisfies Style;

const FLEX_DIRECTION = {
	"center": "row",
	"left": "row",
	"right": "row-reverse",
	"bottom": "row"
} as const;

const JUSTIFY_CONTENT = {
	"center": "center",
	"left": "flex-start",
	"right": "flex-start",
	"bottom": "flex-start"
} as const;

export default function PopupBackdrop ({id, className, style, open, position = "center", onClose, children}: PopupBackdropProps)
{
	const ref = useRef<HTMLDivElement | null> (null);

	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			flexDirection: FLEX_DIRECTION[position],
			justifyContent: JUSTIFY_CONTENT[position],
			...style
		}),
		[style, position]
	);
	
	function handleClickOutside (e: React.MouseEvent)
	{
		e.stopPropagation();
		e.preventDefault();
		if (e.target === ref.current)
			onClose?.();
	}

	if (!open)
		return null;
	
	return createPortal (
		<div
			id = {id}
			className = {className}
			onClick = {handleClickOutside}
			css = {css}
			ref = {ref}
		>
			{children}
		</div>,
		document.body
	);
}