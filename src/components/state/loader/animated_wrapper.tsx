import useStyle from "../../../hooks/useStyle";
import BlockSkeletonLoaderProps from "../../../types/components/SkeletonLoader/BlockSkeletonLoaderProps";

interface AnimatedLoaderWrapperProps
{
	className?: string;
	id?: string;
	style?: BlockSkeletonLoaderProps["parentStyle"];
	children?: React.ReactNode;
}

export default function AnimatedLoaderWrapper ({id, className, style, children}: AnimatedLoaderWrapperProps)
{
	const css = useStyle ("skeletonLoader.block", style, undefined, "parentStyle");
	
	return (
		<div css = {css} className = {className} id = {id}>
			{children}
		</div>
	);
}