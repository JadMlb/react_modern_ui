import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

interface SwitchWrapperProps
{
	id?: string;
	className?: string;
	style?: Style;
	children: React.ReactNode;
}

export default function SwitchWrapper ({style, children}: SwitchWrapperProps)
{
	const css = useStyle ("switch", style, undefined, "parentStyle");

	return (
		<div css = {css}>
			{children}
		</div>
	);
}