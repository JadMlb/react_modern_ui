import { useEffect, useState } from "react";
import { Style, useThemeParser } from "../../../styles";
import BlockSkeletonLoaderProps from "../../../types/components/SkeletonLoader/BlockSkeletonLoaderProps";
import TextLineLoader from "./line";
import AnimatedLoaderWrapper from "./animated_wrapper";

export default function BlockSkeletonLoader ({id, className, style, parentStyle}: BlockSkeletonLoaderProps)
{
	const parseCss = useThemeParser();
	const [parentCss, setParentCss] = useState<Style> ({});

	useEffect (
		() =>
		{
			if (parentStyle)
				setParentCss (parseCss (parentStyle));
			else
				setParentCss ({});
		},
		[parentStyle, parseCss]
	);
	
	return (
		<AnimatedLoaderWrapper css = {parentCss} className = {className} id = {id}>
			<TextLineLoader style = {{height: 100, width: 100, ...style}}/>
		</AnimatedLoaderWrapper>
	);
}