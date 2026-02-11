import { Tag } from "@jad-mlb/react-modern-ui";
import Tooltip from "../../../components/tooltip";

export default function AriaTooltip ()
{
	return (
		<Tooltip
			as = "code"
			colour = "success"
			popupContents = {
				<>This component supports props that start with <Tag as = "code">aria-</Tag> to allow for better semantics. This component also supports data props.</>
			}
		>
			ARIA compatible
		</Tooltip>
	);
}