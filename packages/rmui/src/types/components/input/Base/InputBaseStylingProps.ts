import { Style } from "../../../styles";
import StylingProps from "../../../styles/StylingProps";
import CommonInputStylingProps from "../CommonInput/CommonInputStylingProps";

export default interface GenericInputBaseStylingProps<T> extends StylingProps<T>, CommonInputStylingProps<T>
{
	/**
	 * Style the hint of the input base
	 */
	hintStyle?: Style<T>;
	/**
	 * Style the error text displayed
	 */
	errorTextStyle?: Style<T>;
}