import { useEffect, useRef, useState } from "react";
import MenuProps from "../../types/components/Menu/MenuProps";
import { createPortal } from "react-dom";
import { Style, useDarkMode, useThemeParser } from "../../styles";
import { Position } from "../../types";

const DEFAULT_MENU_STYLE = {
	position: "absolute",
	zIndex: "10000",
	borderRadius: "radius.medium",
	padding: "spacing.medium"
} satisfies Style;

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

export default function Menu ({id, className, anchorElement, position, direction, open, style, children, onClose}: MenuProps)
{
	const ref = useRef<HTMLDivElement | null> (null);
	const [css, setCss] = useState<Style> ({});
	const parseCss = useThemeParser();
	const isDark = useDarkMode();

	useEffect (
		() =>
		{
			setCss (
				parseCss ({
					...DEFAULT_MENU_STYLE,
					backgroundColor: isDark ? "black" : "white",
					color: isDark ? "white" : "black",
					border: `1px solid gray${isDark ? "Dark" : "Light"}`,
					...getCssFromMenuPosition (position, direction, anchorElement),
					...style
				})
			);
		},
		[style, anchorElement, position, direction, isDark]
	);

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