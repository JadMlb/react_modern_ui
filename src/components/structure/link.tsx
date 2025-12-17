import { LinkProps } from "../../types/components/Link/LinkProps";
import useProps from "../../hooks/useProps";
import useStyle from "../../hooks/useStyle";

export default function Link (props: LinkProps)
{
	const {
		style,
		to,
		children,
		...rest
	} = useProps ("link", props);
	const css = useStyle ("link", style);
	
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