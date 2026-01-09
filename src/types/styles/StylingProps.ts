import BasicCssStylingProps from "./BasicCssStylingProps";
import { Style } from "./type";

export default interface StylingProps<T = any> extends BasicCssStylingProps
{
	style?: Style<T>;
}