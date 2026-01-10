import { TagProps } from "../../types/components/Tag/TagProps";
import useProps from "../../hooks/useProps";
import useStyle from "../../hooks/useStyle";

export default function Tag (instanceProps: TagProps)
{
	const props = useProps ("tag", instanceProps);
	const {id, className, style, onClick, children} = props;
	const css = useStyle ("tag", props, style);

	return (
		<div
			css = {css}
			className = {className}
			id = {id}
			onClick = {onClick}
		>
			{children}
		</div>
	);
}