import { Style } from "../../../styles";
import { GenericProps } from "../GenericProps";

export default interface SkeletonLoaderProps extends GenericProps
{
	/**
	 * Defines the type of the SkeletonLoader. Defaults to `text`.
	 */
	type?: "text" | "block";
	/**
	 * Customizes the style of the parent component wrapping the main elements;
	 */
	parentStyle?: Style;
}