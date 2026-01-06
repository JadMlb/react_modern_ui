import { useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import PopupBackdropProps from "../../../types/components/Popups/PopupBackdropProps";
import useStyle from "../../../hooks/useStyle";

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

export default function PopupBackdrop ({id, className, style, open, forComponent, position = "center", onClose, children}: PopupBackdropProps)
{
	const ref = useRef<HTMLDivElement | null> (null);

	const injectedStyles = useMemo (
		() => ({
			flexDirection: FLEX_DIRECTION[position],
			justifyContent: JUSTIFY_CONTENT[position],
		}),
		[position]
	);

	const css = useStyle (forComponent, style, injectedStyles, "backdropStyle");
	
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