import EdgeButton from "./edge_button";
import LeadingTrailingProps from "./LeadingTrailingProps";

export default function NumberInputLeading ({disabled, children, onChange}: LeadingTrailingProps)
{
	return (
		<>
			<EdgeButton
				onChange = {onChange}
				disabled = {disabled}
				dec
			/>
			{children}
		</>
	);
}