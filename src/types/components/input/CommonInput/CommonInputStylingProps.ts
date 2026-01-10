import { Style } from "../../../styles";
import BoxValueInputStylingProps from "../BoxValue/BoxValueInputStylingProps";

export default interface CommonInputStylingProps<T> extends BoxValueInputStylingProps<T>
{
	/**
	 * Defines the style of the wrapper element of the input's base element, englobing the label, the hint, leading and trailing components as well as the input itself.
	 */
	fieldsetStyle?: Style<T>;
}