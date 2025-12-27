import { BoxValueInputProps, OnChangeFunction } from "../input";
import SwitchStylingProps from "./SwitchStylingProps";

export interface SwitchProps extends BoxValueInputProps, SwitchStylingProps
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

export type OverridableSwitchProps = never;