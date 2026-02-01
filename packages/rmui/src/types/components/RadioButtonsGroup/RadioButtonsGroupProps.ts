import { ValueInputProps } from "../input/ValueInputProps";
import { OnChangeFunction } from "../input";
import { Option } from "../../Option";
import { CheckboxProps } from "../Checkbox/CheckboxProps";
import GenericRadioButtonsGroupStylingProps from "./RadioButtonsGroupStylingProps";
import { Props } from "../Props";

export interface RadioButtonsGroupConfigProps extends Omit<ValueInputProps, "autoFocus" | "defaultValue" | "onKeyUp" | "onKeyDown">
{
	/**
	 * Sets some props for all checkboxes
	 */
	checkboxProps?: Omit<CheckboxProps, "label" | "value" | "defaultValue" | "style" | "labelStyle" | "checkedStyle" | "intermediateStyle">;
	/**
	 * The different options of the group. Displayed in their order of appearance.
	 */
	options: Option[];
	/**
	 * The value this RadioButtonsGroup should have. It should match the value property of one of the options.
	 */
	value?: string;
	/**
	 * Sets the group to optional by adding a clear button and enabling the group to have a null value. Defaults to `false`.
	 */
	optional?: boolean;
	onChange?: OnChangeFunction<Option | null>;
}

export type RadioButtonsGroupStylingProps = GenericRadioButtonsGroupStylingProps<RadioButtonsGroupConfigProps>;
export type RadioButtonsGroupProps = Props<RadioButtonsGroupConfigProps, RadioButtonsGroupStylingProps>;

export type OverridableRadioButtonsGroupProps = never;