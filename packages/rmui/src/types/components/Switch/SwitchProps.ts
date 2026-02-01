import { BoxValueInputProps, OnChangeFunction } from "../input";
import { Props } from "../Props";
import GenericSwitchStylingProps from "./SwitchStylingProps";

export interface SwitchConfigProps extends BoxValueInputProps
{
	/**
	 * The label to be displayed next to the checkbox
	 */
	label?: string;
	/**
	 * Specifies whether the switch is switched on or not.
	 * Defaults to `false`.
	 */
	value?: boolean;
	onChange?: OnChangeFunction<boolean>;
}

export type SwitchStylingProps = GenericSwitchStylingProps<SwitchConfigProps>;
export type SwitchProps = Props<SwitchConfigProps, SwitchStylingProps>;

export type OverridableSwitchProps = never;