import { GenericProps } from "../GenericProps";

export interface RadioButtonsGroupProps extends GenericProps
{
	/**
	 * The name of the field that contains the value of this input
	 */
	name: string,
	/**
	 * The labels of the different options. Displayed in their order of appearance.
	 */
	optionsLabels: string[],
	/**
	 * The default value this RadioButtonsGroup should start with. Defaults to the first value. `onChange` event handler fired upon load.
	 */
	defaultValue?: string,
	/**
	 * The change event handler fired when a new value is selected
	 * @param newValue The label of the newly selected value
	 */
	onChange?: (newValue: string) => void
}