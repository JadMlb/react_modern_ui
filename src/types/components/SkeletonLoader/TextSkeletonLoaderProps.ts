import SkeletonLoaderProps from "./SkeletonLoaderProps";

export default interface TextSkeletonLoaderProps extends SkeletonLoaderProps
{
	type?: "text";
	/**
	 * Defines the number of lines to render. Defaults to `5`.
	 */
	lines?: number;
}