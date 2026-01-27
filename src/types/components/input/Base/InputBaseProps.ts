import BaseProps from "../../BaseProps";
import { Props } from "../../Props";
import GenericInputBaseStylingProps from "./InputBaseStylingProps";

export default interface InputBaseConfigProps extends BaseProps
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
	onContextMenu?: React.MouseEventHandler;
}

export type InputBaseStylingProps = GenericInputBaseStylingProps<InputBaseConfigProps>;
export type InputBaseProps = Props<InputBaseConfigProps, InputBaseStylingProps>;

export type OverridableInputBaseProps = never;