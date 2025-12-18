import { useMemo } from "react";
import TextSkeletonLoaderProps from "../../../types/components/SkeletonLoader/TextSkeletonLoaderProps";
import TextLineLoader from "./line";
import AnimatedLoaderWrapper from "./animated_wrapper";
import useProps from "../../../hooks/useProps";

export default function TextSkeletonLoader (props: TextSkeletonLoaderProps)
{
	const {id, className, style, parentStyle, lines = 5} = useProps ("skeletonLoader.text", props);

	const mapperArray = useMemo (
		() => Array.from({length: lines}, (_, i) => i),
		[lines]
	);

	return (
		<AnimatedLoaderWrapper style = {parentStyle} className = {className} id = {id}>{
			mapperArray.map (
				i => <TextLineLoader
						key = {`rmui-line-loader-${i}`}
						style = {style}
					/>
			)
		}</AnimatedLoaderWrapper>
	);
}