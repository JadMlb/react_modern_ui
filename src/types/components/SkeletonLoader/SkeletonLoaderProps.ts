import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";

export default interface SkeletonLoaderProps extends WrappedElementStylingProps
{
	/**
	 * Defines the type of the SkeletonLoader. Defaults to `text`.
	 */
	type?: "text" | "block";
}