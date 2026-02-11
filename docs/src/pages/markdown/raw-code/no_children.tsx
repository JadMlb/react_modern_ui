import Tooltip from "../../../components/tooltip";

export default function NoChildrenTooltip ()
{
	return (
		<Tooltip
			as = "code"
			colour = "error"
			popupContents = {
				<>
					This component does not accept children.
				</>
			}
		>
			Doesn't accept children
		</Tooltip>
	);
}