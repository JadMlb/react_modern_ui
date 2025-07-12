import { useEffect, useMemo, useState } from "react";
import TextSkeletonLoaderProps from "../../../types/components/SkeletonLoader/TextSkeletonLoaderProps";
import TextLineLoader from "./line";
import { Style, spacing, useThemeParser } from "../../../styles";
import AnimatedLoaderWrapper from "./animated_wrapper";

const DEFAULT_PARENT_STYLE = {
	display: "flex",
	flexDirection: "column",
	gap: spacing.normal
} satisfies Style;

export default function TextSkeletonLoader ({id, className, style, parentStyle, lines = 5}: TextSkeletonLoaderProps)
{
	const mapperArray = useMemo (
		() => Array.from({length: lines}, (_, i) => i),
		[lines]
	);

	const parseCss = useThemeParser();
	const [parentCss, setParentCss] = useState<Style> ({});

	useEffect (
		() =>
		{
			if (parentStyle)
				setParentCss (parseCss ({...DEFAULT_PARENT_STYLE, ...parentStyle}));
			else
				setParentCss (parseCss ({...DEFAULT_PARENT_STYLE}));
		},
		[parentStyle, parseCss]
	);

	return (
		<AnimatedLoaderWrapper css = {parentCss} className = {className} id = {id}>{
			mapperArray.map (
				i => <TextLineLoader
						key = {`rmui-line-loader-${i}`}
						style = {style}
					/>
			)
		}</AnimatedLoaderWrapper>
	);
}