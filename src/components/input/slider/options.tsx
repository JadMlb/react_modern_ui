import SliderDivisionsProps from "./SliderDivisionProps";

export default function Options ({divisions}: SliderDivisionsProps)
{
	if (divisions.length === 0)
		return null;

	return (
		<datalist id = "slider-marks">{
			divisions.map (
				d => <option
						key = {d.value}
						value = {d.value}
						label = {d.display}
					/>
			)
		}</datalist>
	);
}