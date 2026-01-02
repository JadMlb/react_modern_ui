import { Style } from "../../../styles";
import StylingProps from "../../../styles/StylingProps";
import CommonInputStylingProps from "../CommonInput/CommonInputStylingProps";

export default interface InputBaseStylingProps extends StylingProps, CommonInputStylingProps
{
	/**
	 * Style the hint of the input base
	 */
	hintStyle?: Style;
	/**
	 * Style the error text displayed
	 */
	errorTextStyle?: Style;
}