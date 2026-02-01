import BaseProps from "../BaseProps";

export default interface SkeletonLoaderConfigProps extends BaseProps
{
	/**
	 * Defines the type of the SkeletonLoader. Defaults to `text`.
	 */
	type?: "text" | "block";
}