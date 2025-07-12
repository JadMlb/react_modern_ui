import BlockSkeletonLoaderProps from "../../../types/components/SkeletonLoader/BlockSkeletonLoaderProps";
import TextSkeletonLoaderProps from "../../../types/components/SkeletonLoader/TextSkeletonLoaderProps";
import BlockSkeletonLoader from "./block";
import TextSkeletonLoader from "./text";

export default function SkeletonLoader ({type = "text", ...rest}: TextSkeletonLoaderProps | BlockSkeletonLoaderProps)
{
	return (
		<>{
			!type || type === "text" ?
				<TextSkeletonLoader type = {type} {...rest}/> :
				<BlockSkeletonLoader type = "block" {...rest}/>
		}</>
	);
}