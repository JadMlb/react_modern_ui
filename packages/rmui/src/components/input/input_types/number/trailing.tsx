import Trailing from "../trailing/trailing";
import TrailingProps from "../trailing/TrailingProps";
import EdgeButton from "./edge_button";
import LeadingTrailingProps from "./LeadingTrailingProps";

interface NumberInputTrailingProps extends LeadingTrailingProps, TrailingProps
{}

export default function NumberInputTrailing ({disabled, children, onChange, ...parentProps}: NumberInputTrailingProps)
{
	return (
		<Trailing {...parentProps}>
			{children}
			<EdgeButton
				onChange = {onChange}
				disabled = {disabled}
			/>
		</Trailing>
	);
}