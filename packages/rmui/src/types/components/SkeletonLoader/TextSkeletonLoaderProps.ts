import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";
import { Props } from "../Props";
import SkeletonLoaderConfigProps from "./SkeletonLoaderProps";

export default interface TextSkeletonLoaderConfigProps extends SkeletonLoaderConfigProps
{
	type?: "text";
	/**
	 * Defines the number of lines to render. Defaults to `5`.
	 */
	lines?: number;
}

export type TextSkeletonLoaderStyleProps = WrappedElementStylingProps<TextSkeletonLoaderConfigProps>;
export type TextSkeletonLoaderProps = Props<TextSkeletonLoaderConfigProps, TextSkeletonLoaderStyleProps>;

export type OverridableTextSkeletonLoaderProps = Pick<TextSkeletonLoaderProps, "lines">;