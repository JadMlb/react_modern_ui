import BadgeProps from "../../../types/components/Badge/BadgeProps";
import BadgeWrapper from "./wrapper";
import BadgeBadge from "./badge";

export default function Badge ({children, parentStyle, ...badgeProps}: BadgeProps)
{
	return (
		<BadgeWrapper style = {parentStyle}>
			{children}
			<BadgeBadge
				{...badgeProps}
			/>
		</BadgeWrapper>
	);
}