import { useMemo } from "react";
import { TextSkeletonLoaderProps } from "../../../types/components/SkeletonLoader/TextSkeletonLoaderProps";
import TextLineLoader from "./line";
import AnimatedLoaderWrapper from "./animated_wrapper";
import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";

export default function TextSkeletonLoader (instanceProps: TextSkeletonLoaderProps)
{
	const props = useProps ("skeletonLoader.text", instanceProps);
	const {style, parentStyle, lines = 5, as, forceMode: _, ...rest} = props;
	
	const css = useStyle ("skeletonLoader.text", props, style);
	const parentCss = useStyle ("skeletonLoader.text", props, parentStyle, "parentStyle");

	const mapperArray = useMemo (
		() => Array.from({length: lines}, (_, i) => i),
		[lines]
	);

	return (
		<AnimatedLoaderWrapper style = {parentCss} {...rest}>{
			mapperArray.map (
				i => <TextLineLoader
						key = {`rmui-line-loader-${i}`}
						style = {css}
					/>
			)
		}</AnimatedLoaderWrapper>
	);
}