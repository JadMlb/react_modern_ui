import { LinkProps } from "../../types/components/Link/LinkProps";
import useProps from "../../hooks/useProps";
import useStyle from "../../hooks/useStyle";

export default function Link (instanceProps: LinkProps)
{
	const props = useProps ("link", instanceProps);
	const {
		style,
		to,
		children,
		...rest
	} = props;
	const css = useStyle ("link", props, style);


	return (
		<a
			href = {to}
			css = {css}
			{...rest}
		>
			{children}
		</a>
	);
}