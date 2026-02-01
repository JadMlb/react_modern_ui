import { StaticStyle } from "../../../types";
import BaseProps from "../../../types/components/BaseProps";

interface AnimatedLoaderWrapperProps extends BaseProps
{
	className?: string;
	id?: string;
	style?: StaticStyle;
	children?: React.ReactNode;
}

export default function AnimatedLoaderWrapper ({style, children, as, ...rest}: AnimatedLoaderWrapperProps)
{
	const Component = as ?? "div";

	return (
		<Component css = {style} {...rest}>
			{children}
		</Component>
	);
}