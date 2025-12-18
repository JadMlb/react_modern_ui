import BlockSkeletonLoaderProps from "../../../types/components/SkeletonLoader/BlockSkeletonLoaderProps";
import TextLineLoader from "./line";
import AnimatedLoaderWrapper from "./animated_wrapper";
import useProps from "../../../hooks/useProps";

export default function BlockSkeletonLoader (props: BlockSkeletonLoaderProps)
{
	const {id, className, style, parentStyle} = useProps ("skeletonLoader.block", props);
	
	return (
		<AnimatedLoaderWrapper style = {parentStyle} className = {className} id = {id}>
			<TextLineLoader style = {style} forType = "block"/>
		</AnimatedLoaderWrapper>
	);
}