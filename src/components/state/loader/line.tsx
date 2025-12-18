import { useMemo } from "react";
import useStyle from "../../../hooks/useStyle";
import StylingProps from "../../../types/styles/StylingProps";

interface TextLineLoaderProps extends StylingProps
{
	forType?: "text" | "block"
}

export default function TextLineLoader ({id, className, forType, style}: TextLineLoaderProps)
{
	const width = useMemo (
		() => Math.random(),
		[]
	);

	const injectedStyles = useMemo (
		() => ({
			width: forType === "block" ? 100 : `${width * 100}%`,
			height: forType === "block" ? 100 : 20
		}),
		[width, forType]
	);
	const css = useStyle (`skeletonLoader.${forType ?? "text"}`, style, injectedStyles);

	return (
		<div css = {css} className = {className} id = {id}/>
	);
}