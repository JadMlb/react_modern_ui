import BasicCssStylingProps from "./BasicCssStylingProps";
import { Style } from "./type";

export default interface StylingProps extends BasicCssStylingProps
{
	style?: Style;
}