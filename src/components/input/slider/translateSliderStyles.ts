import { Style } from "../../../types";


function toString (value: number | string)
{
	if (typeof value === "number")
		return `${value}px`;
	if (value === "unset" || value === "none")
		return "0px";
	return value;
}

function get (key: "margin" | "padding", style: Style): string
{
	const props = Object.entries (style)
						.reverse()
						.filter (k => k[0].startsWith (key));
	return toString (props[0]?.[1] ?? 0);
}

function getBorderWidth (style: Style): string
{
	const props = Object.entries (style)
						.reverse()
						.filter (k => k[0] === "border" || k[0] === "borderWidth");
	if (props.length === 0)
		return "0px";
	const value = props[0];
	if (value[0] === "border")
	{
		const parts = value[1].split (" ");
		return parts[0] !== "inset" ? parts[0] : parts[1];
	}

	return toString (props[0][1] ?? 0);
}

export function getMargin (style: Style): string
{
	const margin = get ("margin", style);
	const padding = get ("padding", style);
	const border = getBorderWidth (style);

	return `calc(${margin} + ${padding} + ${border})`;
}

export function translateSliderStyles (style?: Style): Style
{
	const extractedKeys = new Set ([
		"cursor",
		"width",
		"margin",
		"marginInline",
		"marginInlineStart",
		"marginInlineEnd",
		"marginBlock",
		"marginBlockStart",
		"marginBlockEnd",
		"marginTop",
		"marginLeft",
		"marginBottom",
		"marginRight",
		"padding",
		"paddingInline",
		"paddingInlineStart",
		"paddingInlineEnd",
		"paddingBlock",
		"paddingBlockStart",
		"paddingBlockEnd",
		"paddingTop",
		"paddingLeft",
		"paddingBottom",
		"paddingRight"
	]);

	const extracted: Record<string, string | number> = {};
	const rest: Record<string, string | number> = {};

	if (style)
		for (const key of Object.keys (style))
		{
			if (extractedKeys.has (key))
				extracted[key] = style[key as keyof typeof style];
			else
				rest[key] = style[key as keyof typeof style];
		}

	return {
		"-webkit-appearance": "none",
		appearance: "none",
		background: "transparent",
		...extracted,
		"&::-webkit-slider-runnable-track": {
			...rest
		},
		"&::-moz-range-track": {
			...rest
		}
	};
}

export function translateSliderThumbStyles (style?: Style): Style
{
	return {
		"&::-webkit-slider-thumb": {
			"-webkit-appearance": "none",
			appearance: "none",
			...style,
		},
		"&::-moz-range-thumb": {
			border: "none",
			borderRadius: 0,
			...style
		}
	};
}