import { useRef } from "react";
import { createPortal } from "react-dom";
import { StaticStyle } from "../../../types";
import PopupBaseProps from "../../../types/components/Popups/PopupBaseProps";
import StylingProps from "../../../types/styles/StylingProps";

interface PopupBackdropProps extends PopupBaseProps, StylingProps
{
	style?: StaticStyle;
}

export default function PopupBackdrop ({id, className, style, open, onClose, children}: PopupBackdropProps)
{
	const ref = useRef<HTMLDivElement | null> (null);

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
			css = {style}
			ref = {ref}
		>
			{children}
		</div>,
		document.body
	);
}