import { useMemo } from "react";
import { Style } from "../../../types";
import { getMargin } from "./translateSliderStyles";
import { useThemeParser } from "../../../styles";

export default function useGrid (divisionsLength: number, style?: Style, shifted?: boolean)
{
	const margin = useMemo (
		() => getMargin ({
			...style
		}),
		[style]
	);

	const parseCss = useThemeParser();
	return useMemo (
		() => parseCss ({
			display: "grid",
			fontSize: "0.7em",
			height: shifted ? undefined : 5,
			marginInline: margin,
			gridTemplateColumns: shifted ? `minmax(10px, 0.5fr) ${"minmax(20px, 1fr) ".repeat (divisionsLength)} minmax(10px, 0.5fr)` : `repeat(${divisionsLength}, minmax(20px, 1fr))`
		}),
		[parseCss, margin, divisionsLength, shifted]
	);
}