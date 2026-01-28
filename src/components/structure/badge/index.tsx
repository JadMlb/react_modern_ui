import { BadgeProps } from "../../../types/components/Badge/BadgeProps";
import BadgeWrapper from "./wrapper";
import BadgeBadge from "./badge";
import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";

export default function Badge (instanceProps: BadgeProps)
{
	const props = useProps ("badge", instanceProps);
	const {style, parentStyle, forceMode: _, ...rest} = props;
	
	const css = useStyle ("badge", rest, style);
	const wrapperCss = useStyle ("badge", rest, parentStyle, "parentStyle");
	
	return (
		<BadgeWrapper style = {wrapperCss}>
			{rest.children}
			<BadgeBadge
				{...rest}
				css = {css}
			/>
		</BadgeWrapper>
	);
}