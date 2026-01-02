import InputBaseStylingProps from "./InputBaseStylingProps";

export default interface InputBaseProps extends InputBaseStylingProps
{
	inputId?: string;
	label?: string;
	children?: React.ReactNode;
	trailing?: React.ReactNode;
	hint?: string;
	textOnError?: string;
	isError?: boolean;
	hideLabel?: boolean;
	className?: string;
	id?: string;
	disabled?: boolean;
	readonly?: boolean;
	onClick?: React.MouseEventHandler;
	onFocus?: React.FocusEventHandler;
	onBlur?: React.FocusEventHandler;
}

export type OverridableInputBaseProps = never;