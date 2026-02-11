import { Tag } from "@jad-mlb/react-modern-ui";
import Tooltip from "../../../components/tooltip";

export default function MutableTooltip ()
{
	return (
		<Tooltip
			as = "code"
			colour = "success"
			popupContents = {
				<>
					This component can be rendered as a different html tag than the default using the <Tag as = "code">as</Tag> prop.
				</>
			}
		>
			Mutable
		</Tooltip>
	);
}