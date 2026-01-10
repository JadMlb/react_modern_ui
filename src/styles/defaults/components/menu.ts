import { Overridable, OverridableMenuProps, Position } from "../../../types";
import MenuProps, { MenuStylingProps } from "../../../types/components/Menu/MenuProps";

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

const DEFAULT_MENU_PROPS: Overridable<OverridableMenuProps, MenuStylingProps> = {
	props: {
		position: {
			vertical: "bottom",
			horizontal: "left"
		},
		direction: {
			vertical: "bottom",
			horizontal: "right"
		}
	},
	styles: {
		style: (isDark, {position, direction, anchorElement}) => ({
			position: "absolute",
			zIndex: "10000",
			borderRadius: "radius.medium",
			padding: "spacing.medium",
			backgroundColor: isDark ? "black" : "white",
			color: isDark ? "white" : "black",
			border: `1px solid gray${isDark ? "Dark" : "Light"}`,
			...getCssFromMenuPosition (position, direction, anchorElement)
		})
	}
};

export default DEFAULT_MENU_PROPS;