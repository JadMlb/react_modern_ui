import { useEffect, useMemo, useRef } from "react";
import MenuProps from "../../types/components/Menu/MenuProps";
import { createPortal } from "react-dom";
import { Position } from "../../types";
import useStyle from "../../hooks/useStyle";
import useProps from "../../hooks/useProps";

type DirectionTranslationsMapType = {
	[k in `${Position["vertical"]}-${Position["horizontal"]}`]: string | null;
};

const DIRECTION_TRANSLATIONS_MAP: DirectionTranslationsMapType = {
	"bottom-right": null,
	"bottom-center": "translateX(-50%)",
	"bottom-left": "translateX(-100%)",
	"center-right": "translateY(-50%)",
	"center-center": "translate(-50%, -50%)",
	"center-left": "translate(-100%, -50%)",
	"top-right": "translateY(-100%)",
	"top-center": "translate(-50%, -100%)",
	"top-left": "translate(-100%, -100%)",
};

const OFFSET_HUMAN_TO_INDEX = {
	"top": 0,
	"center": 1,
	"bottom": 2,
	"left": 0,
	"right": 2
};

const OFFSET_MAP = [
	(_: number) => 0,
	(value: number) => value / 2,
	(value: number) => value
];

function getCssFromMenuPosition (position: MenuProps["position"], direction: MenuProps["direction"], anchor: HTMLElement | null)
{
	if (anchor === null)
		return {};
	
	const realPosition = {
		horizontal: position?.horizontal ?? "left",
		vertical: position?.vertical ?? "bottom"
	};
	
	const realDirection = {
		horizontal: direction?.horizontal ?? "right",
		vertical: direction?.vertical ?? "bottom"
	};

	const anchorRect = anchor.getBoundingClientRect();
	const horizontalOffset = anchorRect.x + OFFSET_MAP[OFFSET_HUMAN_TO_INDEX[realPosition.horizontal]] (anchorRect.width);
	const verticalOffset = anchorRect.y + OFFSET_MAP[OFFSET_HUMAN_TO_INDEX[realPosition.vertical]] (anchorRect.height);

	const css : string[][] = [["top", `${verticalOffset}px`], ["left", `${horizontalOffset}px`]];
	const translation = DIRECTION_TRANSLATIONS_MAP[`${realDirection.vertical}-${realDirection.horizontal}`];
	if (translation)
		css.push (["transform", translation]);
	
	return Object.fromEntries (css);
}

export default function Menu (props: MenuProps)
{
	const {
		id,
		className,
		position,
		direction,
		style,
		children,
		onClose
	} = useProps ("menu", props);
	const open = props.open;
	const anchorElement = props.anchorElement;
	
	const ref = useRef<HTMLDivElement | null> (null);

	const injectedStyles = useMemo (
		() => getCssFromMenuPosition (position, direction, anchorElement),
		[position, direction, anchorElement]
	);

	const css = useStyle ("menu", style, injectedStyles);

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