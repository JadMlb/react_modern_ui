import { BoxValueInputProps } from "../input/BoxValueInputProps";
import { CheckboxStylingProps } from "./CheckboxStyleProps";

export interface CheckboxProps extends BoxValueInputProps, CheckboxStylingProps
{
	/**
	 * The label to be displayed next to the checkbox
	 */
	label?: string;
	/**
	 * Specifies whether the checkbox is checked or not.
	 * When a `boolean` is passed, the checkbox is in normal mode and has 2 states.
	 * When a `number`, either `0`, `1` or `2` is passed, the checkbox is now in tri-state mode and takes the state equivalent to the value provided, i.e. `0` -> unchecked, `1` -> dash / intermediate / not full, `2` -> checked / full.
	 * Defaults to `false`.
	 */
	value?: boolean | 0 | 1 | 2;
	defaultValue?: boolean | 0 | 1 | 2;
		/**
	 * Sets the component used when the checkbox's `state` is set to `true` or `2`, i.e. the check mark
	 */
	checkedComponent?: React.ReactNode;
	/**
	 * Sets the component used when the checkbox's `state` is set to `1`, i.e. the check mark
	 */
	intermediateComponent?: React.ReactNode;
}

export type OverridableCheckboxProps = Pick<CheckboxProps, "defaultValue" | "checkedComponent" | "intermediateComponent">;