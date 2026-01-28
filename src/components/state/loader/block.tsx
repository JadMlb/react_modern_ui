import { BlockSkeletonLoaderProps } from "../../../types/components/SkeletonLoader/BlockSkeletonLoaderProps";
import TextLineLoader from "./line";
import AnimatedLoaderWrapper from "./animated_wrapper";
import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";

export default function BlockSkeletonLoader (instanceProps: BlockSkeletonLoaderProps)
{
	const props = useProps ("skeletonLoader.block", instanceProps);
	const {style, parentStyle, forceMode: _, ...rest} = props;
	
	const css = useStyle ("skeletonLoader.block", props, style);
	const parentCss = useStyle ("skeletonLoader.block", props, parentStyle, "parentStyle");
	
	return (
		<AnimatedLoaderWrapper style = {parentCss} {...rest}>
			<TextLineLoader style = {css}/>
		</AnimatedLoaderWrapper>
	);
}