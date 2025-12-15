import { ValueInputProps } from "../input/ValueInputProps";
import { CheckboxStylingProps } from "../Checkbox/CheckboxStyleProps";
import { OnChangeFunction } from "../input";
import { Option } from "../../Option";

export interface RadioButtonsGroupProps extends Omit<ValueInputProps, "autoFocus" | "defaultValue">
{
	/**
	 * Sets some props for all checkboxes
	 */
	checkboxProps?: CheckboxStylingProps;
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

export type OverridableRadioButtonsGroupProps = Pick<RadioButtonsGroupProps, "checkboxProps">;