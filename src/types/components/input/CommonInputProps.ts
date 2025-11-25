import { Style } from "../../../styles";
import { ValueInputProps } from "./ValueInputProps";

export interface CommonInputProps extends ValueInputProps
{
	/**
	 * The component to be rendered before the input itself
	 */
	leading?: React.ReactNode;
	/**
	 * Defines the style of the wrapper element of the input's base element, englobing the label, the hint, leading and trailing components as well as the input itself.
	 */
	fieldsetStyle?: Style;
}