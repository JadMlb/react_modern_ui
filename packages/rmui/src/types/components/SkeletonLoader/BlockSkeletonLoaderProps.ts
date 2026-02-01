import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";
import { Props } from "../Props";
import SkeletonLoaderConfigProps from "./SkeletonLoaderProps";

export default interface BlockSkeletonLoaderConfigProps extends SkeletonLoaderConfigProps
{
	type?: "block";
}

export type BlockSkeletonLoaderStyleProps = WrappedElementStylingProps<BlockSkeletonLoaderConfigProps>;
export type BlockSkeletonLoaderProps = Props<BlockSkeletonLoaderConfigProps, BlockSkeletonLoaderStyleProps>;

export type OverridableBlockSkeletonLoaderProps = never;