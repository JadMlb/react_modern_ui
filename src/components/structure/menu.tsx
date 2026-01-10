import { useEffect, useRef } from "react";
import { MenuProps } from "../../types/components/Menu/MenuProps";
import { createPortal } from "react-dom";
import useStyle from "../../hooks/useStyle";
import useProps from "../../hooks/useProps";

export default function Menu (instanceProps: MenuProps)
{
	const props = useProps ("menu", instanceProps);
	const {
		open,
		anchorElement,
		id,
		className,
		style,
		children,
		onClose
	} = props;

	const css = useStyle ("menu", props, style);

	const ref = useRef<HTMLDivElement | null> (null);

	useEffect (
		() =>
		{
			function handleClickOutside (e: MouseEvent)
			{
				e.preventDefault();
				e.stopPropagation();

				const target = e.target as HTMLElement;

				if (open && !ref.current?.contains (target) && anchorElement !== target)
					onClose?.();
			}

			document.addEventListener ("click", handleClickOutside);

			return () => document.removeEventListener ("click", handleClickOutside);
		},
		[onClose, open, anchorElement]
	);

	if (!open)
		return null;

	return createPortal (
		<div
			id = {id}
			className = {className}
			css = {css}
			ref = {ref}
		>
			{children}
		</div>,
		document.body
	);
}