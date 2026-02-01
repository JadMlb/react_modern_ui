import { Style } from "../../../types";
import Label from "./label";
import SliderDivisionsProps from "./SliderDivisionProps";
import useGrid from "./useGrid";

interface LabelsProps extends SliderDivisionsProps
{
	style?: Style;
}

export default function Labels ({style, divisions}: LabelsProps)
{
	const css = useGrid (
		divisions.length,
		style,
		true
	);
	
	return (
		<div css = {css}>
			<Label
				data = {{value: "0", display: ""}}
			/>
			{
				divisions.map (
					d => <Label
							key = {d.value}
							data = {d}
						/>
				)
			}
		</div>
	);
}