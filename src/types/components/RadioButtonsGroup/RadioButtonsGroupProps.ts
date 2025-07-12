import { Style } from "../../../styles";
import { ValueInputProps } from "../input/ValueInputProps";
import { CheckboxStylingProps } from "../Checkbox/CheckboxProps";

export interface RadioButtonsGroupProps extends ValueInputProps
{
	/**
	 * Sets the style of the group container
	 */
	style?: Style;
	/**
	 * Sets some props for all checkboxes
	 */
	checkboxProps?: CheckboxStylingProps;
	/**
	 * The labels of the different options. Displayed in their order of appearance.
	 */
	optionsLabels: string[];
	/**
	 * The value this RadioButtonsGroup should have.
	 * If the value is a `number` it is treated as the index of the option.
	 * If this index exceeds the array length, the first element is chosen.
	 */
	value?: string | number;
	/**
	 * Sets the group to optional by adding a clear button and enabling the group to have a null value. Defaults to `false`.
	 */
	optional?: boolean;
}