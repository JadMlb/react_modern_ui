import { Style } from "../../../styles";
import { Option } from "../../Option";
import { BoxValueInputProps, OnChangeFunction } from "../input";

export interface SliderProps extends Omit<BoxValueInputProps, "label" | "labelStyle" | "hideLabel">
{
	/**
	 * The initial value of this slider
	 */
	value?: number;
	/**
	 * Change event handler fired when the slider value is changed
	 */
	onChange?: OnChangeFunction<number>;
	/**
	 * Defines the minimum value of the slider. Defaults to `0`.
	 */
	min?: number;
	/**
	 * Defines the maximum value of the slider. Defaults to `100`.
	 */
	max?: number;
	/**
	 * Defines the step size of the slider. Defaults to `1`.
	 */
	step?: number;
	/**
	 * Defines the labels of the steps.
	 * - If a list of `Option`-like is passed, only these values are shown
	 * - If left `undefined` no mark is shown
	 * - If set to `true`, all marks (for each step) are shown, only if `step` is defined
	 * - If a `number` is passed, marks appear at that interval starting from `min`.
	 * Only marks within the range (`min` to `max`) are shown.
	 * 	- **Example:** `stepsLabels = 2`: marks every 2 units from `min`.
	 * 	- **Example:** `min = 0.01`, `max = 0.1`, `stepsLabels = 1`: no marks, because the next mark is outside the range.
	 */
	stepsLabels?: number | true | Option[];
	/**
	 * Defines the style of the slider bar.
	 * This object abstracts the underlying complex styling for `<input type = "range"/>` which is encapsulated.
	 * For more info on how to use, check the documentation.
	 */
	style?: Style;
	/**
	 * Defines the style of the slider thumb
	 */
	thumbStyle?: Style;
	/**
	 * Sets the slider to be vertical
	 */
	vertical?: boolean;
}