import { BlockSkeletonLoaderProps } from "../../../types/components/SkeletonLoader/BlockSkeletonLoaderProps";
import TextLineLoader from "./line";
import AnimatedLoaderWrapper from "./animated_wrapper";
import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";

export default function BlockSkeletonLoader (instanceProps: BlockSkeletonLoaderProps)
{
	const props = useProps ("skeletonLoader.block", instanceProps);
	const {id, className, style, parentStyle} = props;
	
	const css = useStyle ("skeletonLoader.block", props, style);
	const parentCss = useStyle ("skeletonLoader.block", props, parentStyle, "parentStyle");
	
	return (
		<AnimatedLoaderWrapper style = {parentCss} className = {className} id = {id}>
			<TextLineLoader style = {css}/>
		</AnimatedLoaderWrapper>
	);
}