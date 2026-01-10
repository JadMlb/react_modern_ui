import { StaticStyle } from "../../../types";

interface SwitchWrapperProps
{
	id?: string;
	className?: string;
	style?: StaticStyle;
	children: React.ReactNode;
}

export default function SwitchWrapper ({style, children}: SwitchWrapperProps)
{
	return (
		<div css = {style}>
			{children}
		</div>
	);
}