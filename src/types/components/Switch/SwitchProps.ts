import { Style } from "../../../styles";
import { BoxValueInputProps, OnChangeFunction } from "../input/BoxValueInputProps";

export interface SwitchProps extends BoxValueInputProps
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
	/**
	 * Customises the styling of the slider background
	 */
	style?: Style;
	/**
	 * Customises the styling of the slider background when the switch is on, a.k.a when `value` is `true`
	 */
	activatedStyle?: Style;
	/**
	 * Customises the styling of the wrapper holding the switch and the label
	 */
	parentStyle?: Style;
	/**
	 * Customises the styling of the slider handle
	 */
	handleStyle?: Style;
	/**
	 * Customises the styling of the slider handle when the switch is on, a.k.a when `value` is `true`
	 */
	activatedHandleStyle?: Style;
	onChange?: OnChangeFunction<boolean>;
}