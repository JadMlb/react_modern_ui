import { useMemo } from "react";
import { Style, useThemeParser } from "../../../styles";
import SliderDivisionsProps from "./SliderDivisionProps";
import Mark from "./mark";
import { Option } from "../../../types";
import { DEFAULT_SLIDER_STYLE } from "../../../types/components/Slider/SliderStyle";
import { getMargin } from "./translateSliderStyles";

const DEFAULT_STYLE = {
	display: "flex",
	justifyContent: "space-between",
	fontSize: "0.7em"
};

const EDGE_DATA = {
	value: "",
	display: ""
} satisfies Option;

interface MarksProps extends SliderDivisionsProps
{
	style?: Style;
}

export default function Marks ({style, divisions}: MarksProps)
{
	const parseCss = useThemeParser();
	const margin = useMemo (
		() => getMargin ({
			...DEFAULT_SLIDER_STYLE,
			...style
		}),
		[style]
	);
	
	const css = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			marginInline: margin
		}),
		[parseCss, margin]
	);
	
	if (divisions.length === 0)
		return null;

	return (
		<div css = {css}>
			<Mark data = {EDGE_DATA} noTick/>
			{
				divisions.map (
					d => <Mark key = {d.value} data = {d}/>
				)
			}
			<Mark data = {EDGE_DATA} noTick/>
		</div>
	);
}