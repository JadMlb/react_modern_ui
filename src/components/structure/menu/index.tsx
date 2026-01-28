import { useCallback, useEffect, useRef, useState } from "react";
import { MenuProps } from "../../../types/components/Menu/MenuProps";
import useStyle from "../../../hooks/useStyle";
import useProps from "../../../hooks/useProps";
import { Position, StaticStyle } from "../../../types";
import MenuBody from "./menu_body";
import useScrollAndResizeTracking from "./useScrollAndResizeTracking";

/**
 * Simple function to serialize values of `Position` type to use in `useEffect` hook
 * @param value The value of type `Position` that needs to be serialized
 * @returns A simple string formed by the value's horizontal and vertical attributes separated by a |
 */
function serializePositionType (value?: Position | Partial<Position>)
{
	return `${value?.horizontal}|${value?.vertical}`;
}

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

export default function Menu (instanceProps: MenuProps)
{
	const props = useProps ("menu", instanceProps);
	const {
		open,
		anchorElement,
		style,
		position,
		direction,
		onClose,
		forceMode: _,
		...rest
	} = props;

	const stylesCss = useStyle ("menu", props, style);
	const [css, setCss] = useState<StaticStyle> ({});

	const ref = useRef<HTMLDivElement | null> (null);

	const getCssFromMenuPosition = useCallback (
		() =>
		{
			if (anchorElement === null)
				return {};
			
			const realPosition = {
				horizontal: position?.horizontal ?? "left",
				vertical: position?.vertical ?? "bottom"
			};
			
			const realDirection = {
				horizontal: direction?.horizontal ?? "right",
				vertical: direction?.vertical ?? "bottom"
			};

			const anchorRect = anchorElement.getBoundingClientRect();
			const horizontalOffset = anchorRect.x + OFFSET_MAP[OFFSET_HUMAN_TO_INDEX[realPosition.horizontal]] (anchorRect.width);
			const verticalOffset = anchorRect.y + OFFSET_MAP[OFFSET_HUMAN_TO_INDEX[realPosition.vertical]] (anchorRect.height);

			const css : string[][] = [["top", `${verticalOffset}px`], ["left", `${horizontalOffset}px`]];
			const translation = DIRECTION_TRANSLATIONS_MAP[`${realDirection.vertical}-${realDirection.horizontal}`];
			if (translation)
				css.push (["transform", translation]);
			
			return Object.fromEntries (css);
		},
		[anchorElement, serializePositionType (position), serializePositionType (direction)]
	);

	const updateMenuStyles = useCallback (
		() =>
		{
			setCss ({
				...stylesCss,
				...getCssFromMenuPosition(),
				position: "fixed",
				zIndex: 10000
			});
		},
		[stylesCss, getCssFromMenuPosition]
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

	useEffect (
		() =>
		{
			if (open)
				updateMenuStyles();
		},
		[open, serializePositionType (position), serializePositionType (direction)]
	);

	useScrollAndResizeTracking (open, updateMenuStyles);

	return (
		<MenuBody
			{...rest}
			open = {open}
			style = {css}
		/>
	);
}