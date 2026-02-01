import { useMemo } from "react";
import SliderDivisionsProps from "./SliderDivisionProps";
import Mark from "./mark";
import { Style } from "../../../types";
import useGrid from "./useGrid";

interface MarksProps extends SliderDivisionsProps
{
	style?: Style;
}

export default function Marks ({style, divisions}: MarksProps)
{
	const css = useGrid (
		divisions.length + 1,
		style
	);

	const marks = useMemo (
		() => divisions.map (
			d => <Mark invisible = {!d.display}/>
		),
		[divisions.length]
	);
	
	if (divisions.length === 0)
		return null;

	return (
		<div css = {css}>
			<Mark invisible/>
			{marks}
		</div>
	);
}