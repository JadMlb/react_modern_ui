import { TagProps } from "../../types/components/Tag/TagProps";
import useProps from "../../hooks/useProps";
import useStyle from "../../hooks/useStyle";

export default function Tag (instanceProps: TagProps)
{
	const props = useProps ("tag", instanceProps);
	const {style, children, as, colour: _,  ...rest} = props;
	const css = useStyle ("tag", props, style);

	const Component = as ?? "div";

	return (
		<Component
			css = {css}
			{...rest}
		>
			{children}
		</Component>
	);
}